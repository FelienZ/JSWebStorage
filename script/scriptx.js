const buku = document.getElementById('nama');
const penulis = document.getElementById('penulis');
const daftar = document.getElementById('daftar');
const form = document.getElementById('form');

let data = JSON.parse(localStorage.getItem('buku'))||[];
function render(){
    daftar.innerHTML = '';
    data.forEach(function(buku,index){
        let idx = index;
        const list = document.createElement('li');
        list.innerHTML =  'Judul: '+ buku.buku + ' <br> Penulis: ' + buku.pengarang + '<br>';
        const tombolHapus = document.createElement('button');
        tombolHapus.textContent = 'Hapus';
        const tombolEdit = document.createElement('button');
        tombolEdit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        list.appendChild(tombolHapus);
        list.appendChild(tombolEdit);
        daftar.appendChild(list);
        
    tombolHapus.addEventListener('click',function(index){
        data.splice(idx,1);
        localStorage.setItem('buku',JSON.stringify(data))
        render();
    });
    tombolEdit.addEventListener('click',function(){
        // list.innerHTML = '';
        const Baru = document.createElement('li');
        const nama = document.createElement('input');
        const pencipta = document.createElement('input');
        nama.placeholder = 'Masukkan Judul';
        pencipta.placeholder = 'Masukkan Pengarang';
        const tombol = document.createElement('button');
        tombol.textContent = 'simpan';
        Baru.appendChild(nama);
        Baru.appendChild(pencipta);
        Baru.appendChild(tombol);
        daftar.replaceChild(Baru, list);
        nama.focus();
        tombol.addEventListener('click',function(){
            const itemBaru = {
        buku: nama.value,
        pengarang: pencipta.value};
        if((itemBaru.buku != '')&&(itemBaru.pengarang != '')){
            data.splice(idx,1,itemBaru);
            localStorage.setItem('buku', JSON.stringify(data));
            render();
        }else{
            alert('Masukkan Data Baru!');
        }
        })
    });
    });
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    const inputBaru = {
        buku: buku.value,
        pengarang: penulis.value};
    if((inputBaru.buku != '')&&(inputBaru.pengarang != '')){
        data.push(inputBaru)
        localStorage.setItem('buku', JSON.stringify(data));
        render();
        buku.value = '';
        penulis.value = '';
    }else{
        alert('Masukkan Data Buku!');
    }

})

render();