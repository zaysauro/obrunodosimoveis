const leadForm = document.querySelector("#leadForm");
const whatsappInput = document.querySelector("#whatsapp");
const rendaInput = document.querySelector("#renda");
const copyButton = document.querySelector("#copyButton");
const formStatus = document.querySelector("#formStatus");
const currentYear = document.querySelector("#currentYear");

const whatsappNumberUrl = "https://wa.me/5541995995844?text=";

currentYear.textContent = new Date().getFullYear();

// Mantém apenas números para aplicar máscaras brasileiras sem bibliotecas.
function onlyNumbers(value) {
  return value.replace(/\D/g, "");
}

// Formata celulares brasileiros com DDD, aceitando 10 ou 11 dígitos.
function formatWhatsapp(value) {
  const digits = onlyNumbers(value).slice(0, 11);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

// Converte a digitação numérica em moeda brasileira para facilitar o lead.
function formatCurrency(value) {
  const digits = onlyNumbers(value);
  const amount = Number(digits) / 100;

  if (!digits) {
    return "";
  }

  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getFieldValue(formData, fieldName) {
  return formData.get(fieldName) || "Não informado";
}

// Centraliza a mensagem para que envio e cópia usem exatamente o mesmo conteúdo.
function buildLeadMessage() {
  const formData = new FormData(leadForm);
  const cidade = getFieldValue(formData, "cidade");
  const compra = getFieldValue(formData, "aquisicao");
  const trabalho = getFieldValue(formData, "trabalho");
  const carteira = getFieldValue(formData, "carteira");
  const renda = getFieldValue(formData, "renda");
  const fgts = getFieldValue(formData, "fgts");
  const filhos = getFieldValue(formData, "filhos");
  const financiamentos = getFieldValue(formData, "financiamento");
  const restricao = getFieldValue(formData, "restricao");

  return [
    "Olá, Bruno!",
    "",
    "Preenchi a pré-análise de crédito no site O Bruno dos Imóveis.",
    "",
    "Segue meu perfil:",
    "",
    `• Cidade/Região: ${cidade}`,
    `• Compra: ${compra}`,
    `• Situação profissional: ${trabalho}`,
    `• Tempo de carteira assinada: ${carteira}`,
    `• Renda familiar bruta: ${renda}`,
    `• FGTS disponível: ${fgts}`,
    `• Filhos menores de idade: ${filhos}`,
    `• Financiamentos ativos: ${financiamentos}`,
    `• Restrição no CPF: ${restricao}`,
    "",
    "Gostaria de saber qual o valor aproximado de financiamento disponível para o meu perfil e quais seriam os próximos passos.",
  ].join("\n");
}

function validateBeforeAction() {
  if (!leadForm.reportValidity()) {
    formStatus.textContent = "Preencha os campos obrigatórios para continuar.";
    return false;
  }

  return true;
}

// Eventos de máscara rodam durante a digitação e não enviam dados para servidor.
whatsappInput.addEventListener("input", (event) => {
  event.target.value = formatWhatsapp(event.target.value);
});

rendaInput.addEventListener("input", (event) => {
  event.target.value = formatCurrency(event.target.value);
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateBeforeAction()) {
    return;
  }

  const message = encodeURIComponent(buildLeadMessage());
  const whatsappUrl = `${whatsappNumberUrl}${message}`;

  formStatus.textContent = "Mensagem pronta. Abrindo o WhatsApp...";
  window.open(whatsappUrl, "_blank");
});

// Alternativa para quando o visitante preferir encaminhar os dados manualmente.
copyButton.addEventListener("click", async () => {
  if (!validateBeforeAction()) {
    return;
  }

  const message = buildLeadMessage();

  try {
    await navigator.clipboard.writeText(message);
    formStatus.textContent = "Dados copiados para a área de transferência.";
  } catch (error) {
    formStatus.textContent =
      "Não foi possível copiar automaticamente. Selecione os dados gerados e copie manualmente.";
  }
});

window.leadPage = {
  buildLeadMessage,
  formatCurrency,
  formatWhatsapp,
};
