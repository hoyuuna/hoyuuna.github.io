fetch('characterData.json') // Lấy dữ liệu từ file characterData.json
  .then(response => response.json()) // Chuyển đổi dữ liệu sang định dạng JSON
  .then(characterData => { // Xử lý dữ liệu JSON
    const searchInput = document.getElementById('searchInput'); // Lấy thẻ input tìm kiếm
    const resultDiv = document.getElementById('result'); // Lấy thẻ div chứa kết quả

    searchInput.addEventListener('input', function() { // Lắng nghe sự kiện input
      const searchTerm = searchInput.value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển về chữ thường
      resultDiv.innerHTML = ''; // Xóa kết quả cũ

      if (searchTerm.length > 0) { // Chỉ tìm kiếm khi có ký tự
        const filteredCharacters = characterData.filter(character =>
          character.name.toLowerCase().includes(searchTerm) // Tìm kiếm gần đúng
        );

        if (filteredCharacters.length > 0) {
          filteredCharacters.forEach(character => { // Duyệt qua các nhân vật tìm được
            const characterDiv = document.createElement('div'); // Tạo thẻ div cho mỗi nhân vật
            characterDiv.classList.add('character'); // Thêm class 'character' cho thẻ div
            characterDiv.innerHTML = `
              <h2>${character.name}</h2>
              <p>Độ hiếm: ${character.rarity}</p>
              <p>Vai trò: ${character.role}</p>
              <p>Gợi ý: ${character.roll_advice}</p>
              <p>Thông tin: ${character.info}</p>
            `;
            resultDiv.appendChild(characterDiv); // Thêm thẻ div vào kết quả
          });
        } else {
          resultDiv.innerHTML = "<p>Không tìm thấy nhân vật.</p>"; // Hiển thị thông báo không tìm thấy
        }
      }
    });
  });
