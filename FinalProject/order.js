/* JavaScript for order.html interactivity */

document.addEventListener("DOMContentLoaded", () => {
    const orderedProduct = JSON.parse(sessionStorage.getItem("orderedProduct"));
    const orderDetailsDiv = document.getElementById("orderDetails");
    const whatsappButton = document.getElementById("whatsappButton");

    if (orderedProduct && orderDetailsDiv) {
        orderDetailsDiv.innerHTML = `
            <p><strong>اسم المنتج:</strong> ${orderedProduct.name}</p>
            <p><strong>السعر:</strong> ${orderedProduct.price}</p>
            <p><strong>المدينة:</strong> ${orderedProduct.city}</p>
        `;

        if (whatsappButton) {
            whatsappButton.addEventListener("click", () => {
                const whatsappNumber = "713178831"; // User's WhatsApp number
                const message = `أرغب في طلب المنتج التالي:\nاسم المنتج: ${orderedProduct.name}\nالسعر: ${orderedProduct.price}\nالمدينة: ${orderedProduct.city}\n\nيرجى التواصل معي لإتمام عملية الشراء.`;
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, "_blank");
            });
        }
    } else if (orderDetailsDiv) {
        orderDetailsDiv.innerHTML = `<p>لا توجد تفاصيل منتج متاحة.</p>`;
        if (whatsappButton) {
            whatsappButton.style.display = "none";
        }
    }
});


