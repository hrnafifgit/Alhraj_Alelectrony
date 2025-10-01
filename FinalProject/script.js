/* JavaScript for main page interactivity */

document.addEventListener('DOMContentLoaded', () => {
    // Function to handle adding product to main page (placeholder for now)
    // This would typically involve fetching data from a backend or local storage
    // and dynamically creating product cards.
    const addProductToMainPage = (product) => {
        console.log('Adding product to main page:', product);
        // Example: Find the relevant product grid and append a new card
        // This part needs more specific implementation based on how products are stored/retrieved.
        // For now, we'll just log it.
    };

    // Function to handle 'Order Product' button click
    document.querySelectorAll('.btn[onclick*="order.html"]').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default navigation for now
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('.product-title').textContent;
                const productPrice = productCard.querySelector('.price span').textContent;
                const productCity = productCard.querySelector('.product-meta span:first-child').textContent.replace('📍 ', '');

                // Store product details in sessionStorage to pass to order.html
                sessionStorage.setItem('orderedProduct', JSON.stringify({
                    name: productName,
                    price: productPrice,
                    city: productCity
                }));
                window.location.href = 'order.html';
            }
        });
    });

    // Search functionality (basic client-side filtering)
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('keyup', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const productName = card.querySelector('.product-title').textContent.toLowerCase();
                const productModel = card.querySelector('.product-model span').textContent.toLowerCase();
                if (productName.includes(searchTerm) || productModel.includes(searchTerm)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});


