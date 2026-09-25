const STORAGE_KEY = "doudemoi_certificate";
const COUNTER_KEY = "doudemoi_certificate_counter";

const certificates = [
  "スマートフォンを開いたものの、何をするか忘れた。",
  "冷蔵庫を開けたが、何も取らずに閉めた。",
  "「あと5分」を3回以上繰り返した。",
  "何かを取りに部屋へ行ったのに、何を取りに来たか忘れた。",
  "授業中に時計を5回以上確認した。",
  "返信を考えているうちに時間が経過した。",
  "LINEを開いたものの、返信せずに閉じた。",
  "寝る前にスマートフォンを触り続けた。",
  "目的もなくスマートフォンを開いた。",
  "一度聞いた話を初めて聞いたような顔で聞いた。",
  "「まあいいか」で問題を解決した。",
  "何もしていないのに疲れた。",
  "家を出た後に忘れ物を思い出した。",
  "時計を見た直後に、もう一度時計を見た。",
  "検索するためにスマートフォンを開いて、別のことを始めた。",
  "特に理由もなくSNSを開いた。",
  "「明日やる」と言った。",
  "何かを探している途中で別のものを見つけた。",
  "自分の名前を書き間違えた。",
  "「これ何に使うんだっけ」と思った。"
];


const inputArea = document.getElementById("inputArea");
const certificateArea = document.getElementById("certificateArea");

const nameInput = document.getElementById("nameInput");
const issueButton = document.getElementById("issueButton");

const status = document.getElementById("status");

const certificateName =
  document.getElementById("certificateName");

const certificateText =
  document.getElementById("certificateText");

const certificateTextLarge =
  document.getElementById("certificateTextLarge");

const certificateDate =
  document.getElementById("certificateDate");

const certificateNumber =
  document.getElementById("certificateNumber");

const downloadButton =
  document.getElementById("downloadButton");

const lineButton =
  document.getElementById("lineButton");

const xButton =
  document.getElementById("xButton");


/* =========================
   今日の日付
========================= */

function getToday() {

  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}


/* =========================
   証明書番号
========================= */

function getNextCertificateNumber() {

  let counter =
    Number(localStorage.getItem(COUNTER_KEY) || "0");

  counter++;

  localStorage.setItem(
    COUNTER_KEY,
    String(counter)
  );

  return String(counter).padStart(7, "0");
}


/* =========================
   証明書表示
========================= */

function showCertificate(data) {

  certificateName.textContent =
    data.name;

  certificateText.textContent =
    "ここに、あなたが成し遂げたどうでもいい事実を証明します。";

  certificateTextLarge.textContent =
    data.text;

  certificateDate.textContent =
    data.date;

  certificateNumber.textContent =
    data.number;


  inputArea.style.display = "none";
  certificateArea.style.display = "block";


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   発行
========================= */

issueButton.addEventListener("click", () => {

  const existing =
    localStorage.getItem(STORAGE_KEY);

  if (existing) {

    status.textContent =
      "このブラウザでは、すでに証明書を発行済みです。";

    return;
  }


  const name =
    nameInput.value.trim();


  if (!name) {

    status.textContent =
      "名前を入力してください。";

    nameInput.focus();

    return;
  }


  const randomIndex =
    Math.floor(Math.random() * certificates.length);


  const data = {

    name: name,

    text: certificates[randomIndex],

    date: getToday(),

    number: getNextCertificateNumber()

  };


  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );


  showCertificate(data);

});


/* =========================
   Enterキー
========================= */

nameInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {

    issueButton.click();

  }

});


/* =========================
   保存
========================= */

downloadButton.addEventListener("click", async () => {

  const certificate =
    document.getElementById("certificate");


  if (typeof html2canvas === "undefined") {

    alert("画像保存機能の読み込みに失敗しました。");

    return;
  }


  downloadButton.disabled = true;

  downloadButton.textContent =
    "画像を作成中…";


  try {

    const canvas =
      await html2canvas(certificate, {

        scale: 3,

        backgroundColor: "#f7f1e3",

        useCORS: true,

        logging: false

      });


    const link =
      document.createElement("a");


    const data =
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      );


    link.download =
      `どうでもいい証明書_${data.name}.png`;


    link.href =
      canvas.toDataURL("image/png");


    link.click();


  } catch (error) {

    console.error(error);

    alert(
      "画像の保存に失敗しました。"
    );

  }


  downloadButton.disabled = false;

  downloadButton.textContent =
    "証明書を画像として保存";

});


/* =========================
   LINE
========================= */

lineButton.addEventListener("click", () => {

  const data =
    JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );


  if (!data) return;


  const message =
    `${data.name}さんの「どうでもいい証明書」が発行されました。\n\n` +
    `証明内容：${data.text}\n` +
    `証明書番号：${data.number}\n\n` +
    `どうでもいい証明書発行所\n` +
    `${location.href}`;


  const url =
    "https://line.me/R/msg/text/?" +
    encodeURIComponent(message);


  window.open(url, "_blank");

});


/* =========================
   X
========================= */

xButton.addEventListener("click", () => {

  const data =
    JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    );


  if (!data) return;


  const text =
    `${data.name}さんの「どうでもいい証明書」が発行されました。\n\n` +
    `「${data.text}」\n\n` +
    `#どうでもいい証明書`;


  const url =
    "https://twitter.com/intent/tweet?" +
    "text=" +
    encodeURIComponent(text) +
    "&url=" +
    encodeURIComponent(location.href);


  window.open(url, "_blank");

});


/* =========================
   起動時
========================= */

window.addEventListener("DOMContentLoaded", () => {

  const saved =
    localStorage.getItem(STORAGE_KEY);


  if (saved) {

    try {

      const data =
        JSON.parse(saved);

      showCertificate(data);

    } catch (error) {

      localStorage.removeItem(STORAGE_KEY);

    }

  }

});
