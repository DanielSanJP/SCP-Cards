fetch("data/data.json")
    .then(response => response.json())
    .then(SCP => {
        const rootDiv = document.getElementById("root");
        SCP.forEach(item => {
            const HTML = document.createElement('div');
            HTML.innerHTML = `
        <div class="scp-catalog" id="#catalog">

            <a class="scp-card" href="page.html?item=${encodeURIComponent(item.item)}">
                <div class="cardTitle"> 
                <h1>${item.item}</h1>
                  <div class="cardContainment"> 
              <img class="cLevel" src="${item.containmentIcon}" alt="">
                  </div>
                    </div>
                    <div class="cardImg">
                    <img class="scpImage" src="${item.image}" alt="${item.item}">
                     <div class="cardName">
                    <h3>${item.name}<h3>
                    </div>
                    </div>
                    <div class="cardDesc">
                    <p><strong class=cardHead>Disruption:</strong> ${item.disruption}</p>
                    <p><strong class=cardHead>Risk:</strong> ${item.risk}</p>
                    <p><strong class=cardHead>Clearance:</strong> ${item.clearance}</p>

                      <div class="cardStats">
                        <div class="StatColumn">
                        ${item.item}
                        </div>
                        <div class="StatColumn">
                        ${item.containment}
                        </div>
                    </div>
   </div>

                </a>
        `;
            rootDiv.appendChild(HTML);
        });
    })
    .catch(error => console.error(error));
