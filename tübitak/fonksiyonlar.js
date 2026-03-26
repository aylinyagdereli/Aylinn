// Veriler
let reasons = JSON.parse(localStorage.getItem("reasons")) || [];
let mesajlar = JSON.parse(localStorage.getItem("mesajlar")) || [];

// Admin login
function login(){
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;
  if(username==="admin" && password==="1234"){
    document.getElementById("loginPage").style.display="none";
    document.getElementById("panel").style.display="flex";
    liste(); istatistikAdmin(); grafikAdmin(); mesajListe();
  } else alert("Kullanıcı adı veya şifre yanlış!");
}

// Dark mode
function darkMode(){ document.body.classList.toggle("dark"); }

// Animasyonlu sayı
function animateValue(id,start,end,duration){
  let obj=document.getElementById(id),range=end-start,current=start,increment=end>start?1:-1,stepTime=Math.abs(Math.floor(duration/range));
  let timer=setInterval(function(){ current+=increment; obj.innerText=current; if(current==end) clearInterval(timer); },stepTime);
}

// Dashboard index
function istatistik(){
  let k=reasons.filter(r=>r.kategori=="Kişisel").length;
  let o=reasons.filter(r=>r.kategori=="Örgütsel").length;
  let y=reasons.filter(r=>r.kategori=="Yönetsel").length;
  if(document.getElementById("kisisel")) animateValue("kisisel",0,k,500);
  if(document.getElementById("orgutsel")) animateValue("orgutsel",0,o,500);
  if(document.getElementById("yonetsel")) animateValue("yonetsel",0,y,500);
}

function grafik(){
  let k=reasons.filter(r=>r.kategori=="Kişisel").length;
  let o=reasons.filter(r=>r.kategori=="Örgütsel").length;
  let y=reasons.filter(r=>r.kategori=="Yönetsel").length;
  if(document.getElementById("chart")){
    const ctx=document.getElementById("chart");
    if(window.myChart) window.myChart.destroy();
    window.myChart=new Chart(ctx,{type:"pie",data:{labels:["Kişisel","Örgütsel","Yönetsel"],datasets:[{data:[k,o,y],backgroundColor:["#3498db","#e67e22","#2ecc71"]}]}, options:{responsive:true}});
  }
}

function istatistikAdmin(){ animateValue("kisisel_admin",0,reasons.filter(r=>r.kategori=="Kişisel").length,500);
animateValue("orgutsel_admin",0,reasons.filter(r=>r.kategori=="Örgütsel").length,500);
animateValue("yonetsel_admin",0,reasons.filter(r=>r.kategori=="Yönetsel").length,500); }

function grafikAdmin(){
  let k=reasons.filter(r=>r.kategori=="Kişisel").length;
  let o=reasons.filter(r=>r.kategori=="Örgütsel").length;
  let y=reasons.filter(r=>r.kategori=="Yönetsel").length;
  const ctx=document.getElementById("chart_admin");
  if(window.myChartAdmin) window.myChartAdmin.destroy();
  window.myChartAdmin=new Chart(ctx,{type:"pie",data:{labels:["Kişisel","Örgütsel","Yönetsel"],datasets:[{data:[k,o,y],backgroundColor:["#3498db","#e67e22","#2ecc71"]}]}, options:{responsive:true}});
}

// Veri ekleme, listeleme
function kaydet(){ localStorage.setItem("reasons",JSON.stringify(reasons)); }
function ekle(){ let kategori=document.getElementById("kategori").value; let neden=document.getElementById("neden").value;
if(neden.trim()==="") return; reasons.push({kategori:kategori,neden:neden}); kaydet(); liste(); istatistikAdmin(); grafikAdmin();}
function sil(i){ reasons.splice(i,1); kaydet(); liste(); istatistikAdmin(); grafikAdmin();}
function liste(){ let tablo=document.getElementById("tablo"); tablo.innerHTML=""; reasons.forEach((r,i)=>{tablo.innerHTML+=`<tr><td>${r.kategori}</td><td>${r.neden}</td><td><button class="actionBtn" onclick="sil(${i})">Sil</button></td></tr>`;});}

// Arama, filtreleme
function ara(){ let k=document.getElementById("arama").value.toLowerCase();
document.querySelectorAll("#tablo tr").forEach(row=>{ row.style.display=row.innerText.toLowerCase().includes(k)?"":"none"; }); }
function filtre(){ let f=document.getElementById("filter").value;
document.querySelectorAll("#tablo tr").forEach(row=>{ row.style.display=(f==="" || row.children[0].innerText==f)?"":"none"; }); }

// Bize Ulaşın
function mesajGonder(){
  let ad=document.getElementById("ad").value;
  let email=document.getElementById("email").value;
  let mesaj=document.getElementById("mesaj").value;
  if(ad.trim()===""||email.trim()===""||mesaj.trim()==="") return;
  mesajlar.push({ad,email,mesaj}); localStorage.setItem("mesajlar",JSON.stringify(mesajlar));
  alert("Mesajınız gönderildi!"); document.getElementById("ad").value=""; document.getElementById("email").value=""; document.getElementById("mesaj").value="";
}

// Admin mesaj listesi
function mesajListe(){ let tablo=document.getElementById("mesajTablo"); tablo.innerHTML=""; mesajlar.forEach(m=>{ tablo.innerHTML+=`<tr><td>${m.ad}</td><td>${m.email}</td><td>${m.mesaj}</td></tr>`; }); }

function veriEkle(kategori, adet){
  reasons.push({kategori});
  localStorage.setItem("reasons", JSON.stringify(reasons));
  istatistik();
  grafik();
}
