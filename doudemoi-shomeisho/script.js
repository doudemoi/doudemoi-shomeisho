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

const nameInput = document.getElementById("nameInput");
const issueButton = document.getElementById("issueButton");

const inputArea = document.getElementById("inputArea");
const certificateArea = document.getElementById("certificateArea");

const status = document.getElementById("status");

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


issueButton.addEventListener("click", () => {

  const name = nameInput.value.trim();

  if (!name) {
    status.textContent = "名前を入力してください。";
    return;
  }

  status.textContent = "証明書を発行しています……";

  setTimeout(() => {

    const randomIndex =
      Math.floor(Math.random() * certificates.length);

    const selectedCertificate =
      certificates[randomIndex];

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const randomNumber =
      Math.floor(10000 + Math.random() * 90000);

    certificateName.textContent = name + " 殿";

    certificateText.textContent =
      selectedCertificate;

    certificateDate.textContent =
      `${year}年${month}月${day}日`;

    certificateNumber.textContent =
      `第${year}${month}${day}-${randomNumber}号`;

    inputArea.classList.add("hidden");

    status.textContent = "";

    certificateArea.classList.remove("hidden");

  }, 1200);

});


downloadButton.addEventListener("click", () => {

  alert("画像保存機能は次の段階で追加します！");

});