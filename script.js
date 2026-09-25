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


/* =========================
   要素
========================= */

const nameInput =
  document.getElementById("nameInput");

const issueButton =
  document.getElementById("issueButton");

const inputArea =
  document.getElementById("inputArea");

const certificateArea =
  document.getElementById("certificateArea");

const status =
  document.getElementById("status");

const certificateName =
  document.getElementById("certificateName");

const certificateText =
  document.getElementById("certificateText");

const certificateQuote =
  document.getElementById("certificateQuote");

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
   初期状態
========================= */

certificateArea.classList.add("hidden");
inputArea.classList.remove("hidden");


/* =========================
   日付
========================= */

function formatDate(date) {

  const year = date.getFullYear();

  const month =
    String(date.getMonth() + 1)
      .padStart(2, "0");

  const day =
    String(date.getDate())
      .padStart(2, "0");

  return {
    year,
    month,
    day,
    text: `${year} 年 ${month} 月 ${day} 日`
  };
}


/* =========================
   発行番号
========================= */

/*
  日付 + 5桁のランダム番号。

  例：
  第 20260925-48283 号
  第 20260925-73104 号
  第 20260925-15692 号

  発行するたびに5桁部分が変わる。
*/

function generateCertificateNumber(date) {

  const randomNumber =
    Math.floor(
      10000 + Math.random() * 90000
    );

  return `第 ${date.year}${date.month}${date.day}-${randomNumber} 号`;
}


/* =========================
   証明書表示
========================= */

function displayCertificate(
  name,
  selectedCertificate,
  date,
  number
) {

  certificateName.textContent =
    `${name} 殿`;

  certificateText.textContent =
    selectedCertificate;

  certificateQuote.textContent =
    `「${selectedCertificate}」`;

  certificateDate.textContent =
    date;

  certificateNumber.textContent =
    number;

  inputArea.classList.add("hidden");

  status.textContent = "";

  certificateArea.classList.remove("hidden");

  /*
    証明書が表示された位置まで移動
  */
  setTimeout(() => {
    certificateArea.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
}


/* =========================
   発行ボタン
========================= */

issueButton.addEventListener(
  "click",
  () => {

    const name =
      nameInput.value.trim();

    if (!name) {

      status.textContent =
        "名前を入力してください。";

      nameInput.focus();

      return;
    }


    issueButton.disabled = true;

    status.textContent =
      "証明書を発行しています……";


    setTimeout(() => {

      /* ランダムな証明内容 */
      const randomIndex =
        Math.floor(
          Math.random() *
          certificates.length
        );

      const selectedCertificate =
        certificates[randomIndex];


      /* 発行日 */
      const now =
        new Date();

      const date =
        formatDate(now);


      /* 発行番号 */
      const number =
        generateCertificateNumber(date);


      /*
        証明書を表示
      */
      displayCertificate(
        name,
        selectedCertificate,
        date.text,
        number
      );


      issueButton.disabled = false;

    }, 900);

  }
);


/* =========================
   Enterキー
========================= */

nameInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {
      issueButton.click();
    }

  }
);


/* =========================
   画像保存
========================= */

downloadButton.addEventListener(
  "click",
  async () => {

    const certificate =
      document.getElementById("certificate");

    if (
      typeof html2canvas ===
      "undefined"
    ) {

      alert(
        "画像保存機能の読み込みに失敗しました。"
      );

      return;
    }


    downloadButton.disabled = true;


    /*
      スマホではCSSで証明書を縮小しているので、
      保存するときだけ縮小を解除する。
    */

    const originalTransform =
      certificate.style.transform;

    certificate.style.transform =
      "none";


    try {

      const canvas =
        await html2canvas(
          certificate,
          {
            scale: 2,
            backgroundColor: "#f7f4ea",
            useCORS: true
          }
        );


      const link =
        document.createElement("a");

      link.download =
        "どうでもいい証明書.png";

      link.href =
        canvas.toDataURL("image/png");

      link.click();

    } catch (error) {

      console.error(error);

      alert(
        "画像の保存に失敗しました。"
      );

    }


    certificate.style.transform =
      originalTransform;

    downloadButton.disabled = false;

  }
);


/* =========================
   LINE
========================= */

lineButton.addEventListener(
  "click",
  () => {

    const text =
      "どうでもいい証明書を発行しました。";

    const url =
      window.location.href;

    const lineUrl =
      "https://line.me/R/msg/text/?" +
      encodeURIComponent(
        `${text}\n${url}`
      );

    window.open(
      lineUrl,
      "_blank"
    );

  }
);


/* =========================
   X
========================= */

xButton.addEventListener(
  "click",
  () => {

    const text =
      "どうでもいい証明書を発行しました。";

    const url =
      window.location.href;

    const xUrl =
      "https://twitter.com/intent/tweet?" +
      new URLSearchParams({
        text: text,
        url: url
      }).toString();

    window.open(
      xUrl,
      "_blank",
      "noopener,noreferrer"
    );

  }
);