const certificates = [
  "スマートフォンを開いたものの、何をするか忘れた",
  "冷蔵庫を開けたが、何も取らずに閉めた",
  "「あと5分」を3回以上繰り返した",
  "何かを取りに部屋へ行ったのに、何を取りに来たか忘れた",
  "授業中に時計を5回以上確認した",
  "返信を考えているうちに時間が経過した",
  "LINEを開いたものの、返信せずに閉じた",
  "寝る前にスマートフォンを触り続けた",
  "目的もなくスマートフォンを開いた",
  "一度聞いた話を初めて聞いたような顔で聞いた",
  "「まあいいか」で問題を解決した",
  "何もしていないのに疲れた",
  "家を出た後に忘れ物を思い出した",
  "時計を見た直後に、もう一度時計を見た",
  "検索するためにスマートフォンを開いて、別のことを始めた",
  "特に理由もなくSNSを開いた",
  "「明日やる」と言った",
  "何かを探している途中で別のものを見つけた",
  "自分の名前を書き間違えた",
  "「これ何に使うんだっけ」と思った"
];


// =========================
// DOM
// =========================

const nameInput = document.getElementById("nameInput");
const issueButton = document.getElementById("issueButton");

const inputArea = document.getElementById("inputArea");
const certificateArea = document.getElementById("certificateArea");

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

const status =
  document.getElementById("status");


// =========================
// 保存場所
// =========================

const STORAGE_KEY = "doudemoi_certificate";

const COUNTER_KEY = "doudemoi_certificate_counter";


// =========================
// 今日の日付
// =========================

function getToday() {

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return `${year} 年 ${month} 月 ${day} 日`;
}


// =========================
// 証明書番号
// =========================

function getNextCertificateNumber() {

  let counter =
    Number(localStorage.getItem(COUNTER_KEY));

  // 初回
  if (!counter || counter < 1) {
    counter = 1;
  } else {
    counter++;
  }

  localStorage.setItem(
    COUNTER_KEY,
    counter
  );

  // 7桁にする
  return String(counter).padStart(7, "0");
}


// =========================
// 証明書を表示
// =========================

function showCertificate(data) {

  certificateName.textContent =
    data.name;

  certificateText.textContent =
    data.text;

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


// =========================
// ページを開いたとき
// =========================

// すでに発行済みなら、
// 同じ証明書を表示する
const savedCertificate =
  localStorage.getItem(STORAGE_KEY);

if (savedCertificate) {

  try {

    const data =
      JSON.parse(savedCertificate);

    showCertificate(data);

  } catch (error) {

    console.error(
      "保存された証明書の読み込みに失敗しました。",
      error
    );

    localStorage.removeItem(STORAGE_KEY);
  }
}


// =========================
// 証明書発行
// =========================

issueButton.addEventListener("click", () => {

  // 念のため二重発行を防止
  const alreadyIssued =
    localStorage.getItem(STORAGE_KEY);

  if (alreadyIssued) {

    status.textContent =
      "このブラウザでは、すでに証明書を発行済みです。";

    return;
  }


  const name =
    nameInput.value.trim();


  if (!name) {

    status.textContent =
      "名前を入力してください。";

    return;
  }


  status.textContent = "";


  // ランダムな証明内容
  const randomIndex =
    Math.floor(
      Math.random() * certificates.length
    );

  const text =
    certificates[randomIndex];


  // 証明書番号
  const number =
    getNextCertificateNumber();


  // 発行日
  const date =
    getToday();


  // 証明書データ
  const certificateData = {

    name: name,

    text: text,

    number: number,

    date: date

  };


  // Chromeのこのサイトに保存
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(certificateData)
  );


  // 表示
  showCertificate(
    certificateData
  );

});


// =========================
// 画像保存
// =========================

downloadButton.addEventListener(
  "click",
  async () => {

    const certificate =
      document.getElementById("certificate");

    downloadButton.textContent =
      "画像を作成中...";

    try {

      const canvas =
        await html2canvas(
          certificate,
          {
            scale: 2,
            backgroundColor: "#f8f5ec",
            useCORS: true
          }
        );


      const link =
        document.createElement("a");

      link.download =
        "どうでもいい証明書.png";

      link.href =
        canvas.toDataURL(
          "image/png"
        );

      link.click();


    } catch (error) {

      console.error(error);

      alert(
        "画像の作成に失敗しました。"
      );

    }


    downloadButton.textContent =
      "証明書を画像として保存";

  }
);


// =========================
// LINE
// =========================

lineButton.addEventListener(
  "click",
  () => {

    const text =
      "どうでもいい証明書を発行しました。\n" +
      "あなたも一枚発行してみてください！\n" +
      window.location.href;


    const url =
      "https://line.me/R/msg/text/?" +
      encodeURIComponent(text);


    window.open(
      url,
      "_blank"
    );

  }
);


// =========================
// X
// =========================

xButton.addEventListener(
  "click",
  () => {

    const text =
      "どうでもいい証明書を発行しました。\n" +
      "#どうでもいい証明書発行所";


    const url =
      "https://twitter.com/intent/tweet?text=" +
      encodeURIComponent(text) +
      "&url=" +
      encodeURIComponent(
        window.location.href
      );


    window.open(
      url,
      "_blank"
    );

  }
);