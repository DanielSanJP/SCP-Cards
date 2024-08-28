// Get the query parameter from the URL
const params = new URLSearchParams(window.location.search);
const itemParam = params.get('item');  // This line retrieves the 'item' parameter from the URL

// Ensure that itemParam is defined before using it
if (itemParam) {
    fetch("data/data.json")
        .then(response => response.json())
        .then(SCP => {
            const rootDiv = document.getElementById("root");
            const selectedSCP = SCP.find(item => item.item === itemParam);

            if (selectedSCP) {
                const containerDiv = document.createElement('div');
                containerDiv.className = 'container';

                // Create image element for the containment bar
                const containmentBarImg = document.createElement('img');
                containmentBarImg.alt = `${selectedSCP.item}`;
                containmentBarImg.className = 'responsive-image';

                // Extract the base name correctly
                const baseName = selectedSCP.cBarDesktop.split('/').pop().replace('Desktop.png', '');
                console.log("Base name for image:", baseName); // Debugging

                containmentBarImg.setAttribute('data-base-name', baseName);

                // Append elements to the container
                containerDiv.appendChild(containmentBarImg);
                containerDiv.innerHTML += `

                <img class="scpImagePage" src="${selectedSCP.image}" alt="${selectedSCP.item}">
                
                 <div class="specs">
                <div class="readCard">
                <p><strong class=cardHead>Item:</strong></p>
                <p> ${selectedSCP.item}</p>
                </div>

                <div class="readCard">
                <p><strong class=cardHead>Containment:</strong></p>
                <p> ${selectedSCP.containment}</p>
                </div>

                <div class="readCard">
                <p><strong class=cardHead>Disruption:</strong></p>
                <p> ${selectedSCP.disruption}</p>
                </div>

                <div class="readCard">
                <p><strong class=cardHead>Risk:</strong></p>
                <p>${selectedSCP.risk}</p>
                </div>

                <div class="readCard">
                <p><strong class=cardHead>Clearance:</strong></p>
                <p> ${selectedSCP.clearance}</p>
                </div>

                </div>


               <div class="readCard">
                <p><strong class=cardHead>Summary:</strong></p>
                <p>${selectedSCP.summary}</p>
                 </div>

                <div class="readCard">
                <p><strong class=cardHead>Special Containment Procedures:</strong></p>
                <p> ${selectedSCP.containmentInfo}</p>
                </div>
            `;

                rootDiv.appendChild(containerDiv);

                // Call updateImages function to set the initial image source
                updateImages();
            } else {
                rootDiv.innerHTML = '<p>SCP not found</p>';
            }
        })
        .catch(error => console.error(error));
} else {
    console.error('itemParam is not defined in the URL');
}

// Update Containment Bar Image for Mobile Size
function updateImages() {
    var images = document.querySelectorAll('.responsive-image'); // Select all images with the class 'responsive-image'

    images.forEach(function (img) {
        var baseName = img.getAttribute('data-base-name');
        console.log("Updating image source for:", baseName); // Debugging

        if (window.innerWidth <= 800) {
            img.src = './images/' + baseName + 'Mobile.png';
        } else {
            img.src = './images/' + baseName + 'Desktop.png';
        }

        console.log("Image source set to:", img.src); // Debugging
    });
}

// Call the function when the page loads
updateImages();

// Add an event listener to handle window resizing
window.addEventListener('resize', updateImages);
