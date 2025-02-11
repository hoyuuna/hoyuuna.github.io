fetch('characterData.json')
  .then(response => response.json())
  .then(characterData => {
    const searchInput = document.getElementById('searchInput');
    const resultDiv = document.getElementById('result');

    searchInput.addEventListener('input', function() {
      const searchTerm = searchInput.value.toLowerCase();
      resultDiv.innerHTML = '';

      if (searchTerm.length > 0) {
        const filteredCharacters = characterData.filter(character => {
          const characterName = character.name.toLowerCase();
          return characterName.includes(searchTerm) || searchTerm.split(" ").every(word => characterName.includes(word));
        });

        filteredCharacters.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), undefined, { sensitivity: 'base' });
        });

        if (filteredCharacters.length > 0) {
          filteredCharacters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character');

            // Lấy chữ đầu tiên của tên
            const firstName = character.name.split(' ')[0];

            // Tạo URL ảnh
            const imageUrl = `https://blue-utils.me/img/common/profile/Skill_Portrait_${firstName}.png`;

            characterDiv.innerHTML = `
              <img src="${imageUrl}" alt="${character.name}" onerror="this.src='placeholder.png'">
              <h2>${character.name}</h2>
              <p>Độ hiếm: ${character.rarity}</p>
              <p>Vai trò: ${character.role}</p>
              <p>Gợi ý: ${character.roll_advice}</p>
              <p>Thông tin: ${character.info}</p>
            `;
            resultDiv.appendChild(characterDiv);
          });
        } else {
          resultDiv.innerHTML = "<p>Không tìm thấy học sinh này ≧ ﹏ ≦</p>";
        }
      }
    });
  });
