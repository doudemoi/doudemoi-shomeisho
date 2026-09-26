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


/* =====================================
   設定
===================================== */

const STORAGE_KEY = "doudemoi_certificate_v1";


/* =====================================
   要素
===================================== */

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


/* =====================================
   保存済み証明書を取得
===================================== */

function getSavedCertificate() {
  try {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return null;
    }

    return JSON.parse(saved);

  } catch (error) {

    console.error(
      "保存データの読み込みに失敗しました。",
      error
    );

    return null;
  }
}


/* =====================================
   証明書を表示
===================================== */

function showCertificate(data) {

  certificateName.textContent =
    data.name + " 殿";

  certificateText.textContent =
    data.certificate;

  certificateDate.textContent =
    data.date;

  certificateNumber.textContent =
    data.number;

  inputArea.classList.add("hidden");

  status.textContent = "";

  certificateArea.classList.remove("hidden");

}


/* =====================================
   発行
===================================== */

issueButton.addEventListener("click", () => {

  const name =
    nameInput.value.trim();


  /* 空欄 */
  if (!name) {

    status.textContent =
      "名前を入力してください。";

    return;
  }


  /* 10文字制限 */
  if ([...name].length > 10) {

    status.textContent =
      "名前は10文字以内で入力してください。";

    return;
  }


  /* すでに発行済み */
  const savedCertificate =
    getSavedCertificate();

  if (savedCertificate) {

    showCertificate(savedCertificate);

    return;
  }


  status.textContent =
    "証明書を発行しています……";

  issueButton.disabled = true;


  setTimeout(() => {

    /* ランダムな証明書 */
    const randomIndex =
      Math.floor(
        Math.random() * certificates.length
      );

    const selectedCertificate =
      certificates[randomIndex];


    /* 日付 */
    const now =
      new Date();

    const year =
      now.getFullYear();

    const month =
      String(now.getMonth() + 1)
        .padStart(2, "0");

    const day =
      String(now.getDate())
        .padStart(2, "0");


    /* 発行番号 */
    const randomNumber =
      Math.floor(
        10000 + Math.random() * 90000
      );


    const data = {

      name: name,

      certificate:
        selectedCertificate,

      date:
        `${year}年${month}月${day}日`,

      number:
        `第${year}${month}${day}-${randomNumber}号`

    };


    /* =====================================
       一度だけ保存
    ===================================== */

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
      );

    } catch (error) {

      console.error(
        "証明書の保存に失敗しました。",
        error
      );

    }


    showCertificate(data);

  }, 1200);

});


/* =====================================
   ページ再読み込み時
===================================== */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    const savedCertificate =
      getSavedCertificate();

    if (savedCertificate) {

      showCertificate(
        savedCertificate
      );

    }

  }
);


/* =====================================
   画像保存
===================================== */

downloadButton.addEventListener(
  "click",
  async () => {

    const certificate =
      document.getElementById("certificate");

    if (!certificate) {
      return;
    }


    try {

      downloadButton.disabled = true;

      downloadButton.textContent =
        "画像を作成しています……";


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

      console.error(
        "画像の保存に失敗しました。",
        error
      );

      alert(
        "画像の作成に失敗しました。もう一度お試しください。"
      );


    } finally {

      downloadButton.disabled = false;

      downloadButton.textContent =
        "証明書を画像として保存";

    }

  }
);


/* =====================================
   LINE
===================================== */

lineButton.addEventListener(
  "click",
  () => {

    const text =
      "どうでもいい証明書が発行されました。\n" +
      "https://doudemoi.github.io/doudemoi-shomeisho/";

    const url =
      "https://line.me/R/msg/text/?" +
      encodeURIComponent(text);

    window.open(
      url,
      "_blank"
    );

  }
);


/* =====================================
   X
===================================== */

xButton.addEventListener(
  "click",
  () => {

    const text =
      "どうでもいい証明書を発行しました。";

    const url =
      "https://doudemoi.github.io/doudemoi-shomeisho/";

    const shareUrl =
      "https://twitter.com/intent/tweet?" +
      "text=" +
      encodeURIComponent(text) +
      "&url=" +
      encodeURIComponent(url);

    window.open(
      shareUrl,
      "_blank"
    );

  }
);