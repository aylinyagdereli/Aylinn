class Ogrenci {
  constructor(ad, yas) {
    this.ad = ad;
    this.yas = yas;
  }
}

let ogrenciler = [];

const ekle = () => {

  let ad = document.getElementById("ad").value.trim();
  let yas = document.getElementById("yas").value;

  if(ad === "" || yas === "") {
    alert("Boş bırakma!");
    return;
  }

  const ogrenci = new Ogrenci(
    ad.charAt(0).toUpperCase() + ad.slice(1),
    Number(yas)
  );

  ogrenciler.push(ogrenci);
  listele();
  jsonGuncelle();

  document.getElementById("ad").value = "";
  document.getElementById("yas").value = "";
};

const sil = (index) => {
  ogrenciler.splice(index, 1);
  listele();
  jsonGuncelle();
};

const guncelle = (index) => {
  let yeniAd = prompt("Yeni isim:");
  if(yeniAd?.trim()) {
    ogrenciler[index].ad = yeniAd.trim();
    listele();
    jsonGuncelle();
  }
};

const listele = () => {

  let ul = document.getElementById("liste");
  ul.innerHTML = "";

  ogrenciler.forEach((ogrenci, index) => {

    const { ad, yas } = ogrenci;

    ul.innerHTML += `
      <li>
        ${ad} - ${yas} yaş
        <button onclick="sil(${index})">Sil</button>
        <button onclick="guncelle(${index})">Güncelle</button>
      </li>
    `;
  });

};



const jsonGoster = () => {
  const panel = document.getElementById("jsonPanel");
  panel.style.display =
    panel.style.display === "none" ? "block" : "none";
};

const jsonGuncelle = () => {
  const panel = document.getElementById("jsonPanel");
  panel.textContent = JSON.stringify(ogrenciler, null, 2);
};


const bekle = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("2 saniye sonra geldi");
    }, 2000);
  });
};


const veriCek = async () => {

  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    let data = await response.json();

    const yeniOgrenci = new Ogrenci(data.name, 20);

    ogrenciler.push(yeniOgrenci);
    listele();
    jsonGuncelle();

    alert("API'den bir öğrenci eklendi!");

  } catch (error) {
    alert("Veri alınamadı!");
  }
};