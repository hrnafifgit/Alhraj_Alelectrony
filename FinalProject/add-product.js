/* JavaScript for add-product.html interactivity */

document.addEventListener("DOMContentLoaded", () => {
    const addProductForm = document.getElementById("addProductForm");
    const successMessage = document.getElementById("successMessage");

    if (addProductForm) {
        addProductForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent default form submission

            // Gather form data
            const productName = document.getElementById("productName").value;
            const productCategory = document.getElementById("productType").value;
            const productDescription = document.getElementById("productDescription").value;
            const productPrice = document.getElementById("productPrice").value;
            const productCity = document.getElementById("productCity").value;
            const productImage = document.getElementById("productImage").files[0]; // Get the file object

            // For demonstration, we'll just log the data and simulate success.
            // In a real application, you would send this data to a server.
            console.log({
                productName,
                productCategory,
                productDescription,
                productPrice,
                productCity,
                productImage: productImage ? productImage.name : null
            });

            // Simulate product addition success
            successMessage.style.display = "block";
            addProductForm.reset(); // Clear the form

            // Hide success message after a few seconds
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 5000);
        });
    }

    // Handle WhatsApp message for the 'إرسال' button on add-product.html
    const sendButton = document.querySelector("input[type=\"submit\"]");
    if (sendButton) {
        sendButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default form submission

            const productName = document.getElementById("productName").value;
            const productPrice = document.getElementById("productPrice").value;
            const productCity = document.getElementById("productCity").value;

            const whatsappNumber = "713178831";
            const message = `طلب منتج جديد:\nاسم المنتج: ${productName}\nالسعر: ${productPrice}\nالمدينة: ${productCity}\n\nيرجى التواصل معي لإتمام عملية الشراء.`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, "_blank");
        });
    }
});


