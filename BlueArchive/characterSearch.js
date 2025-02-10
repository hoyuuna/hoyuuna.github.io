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

        // Sắp xếp kết quả theo bảng chữ cái, ví dụ "hina" trước "hinata" và "chinat" trước "hina"
        filteredCharacters.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase(), undefined, { sensitivity: 'base' });
        });

        if (filteredCharacters.length > 0) {
          filteredCharacters.forEach(character => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character');
            characterDiv.innerHTML = `
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
