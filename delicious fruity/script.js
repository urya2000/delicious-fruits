$(document).ready(function() {
  $('.nav li').on('click', function() {
    $('.nav li').removeClass('active');
    $(this).addClass('active');
  });

  $('.nav-items li').click(function() {
    $('.nav-items li').removeClass('active');
    $(this).addClass('active');
  });

  var totalCount = 0;
  var cartItems = [];

  // Show cart icon and count if there are items in the cart
  function updateCartIcon() {
    if (totalCount > 0) {
      $('#cart-icon').removeClass('hide');
    } else {
      $('#cart-icon').addClass('hide');
    }
    $('#cart-count').text(totalCount);
  }

  // Update cart total value
  function updateTotal() {
    var total = 0;
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      total += item.price * item.quantity;
    }
    $('#cart-total').text('Total: $' + total.toFixed(2));
  }

  // Show modal with cart items
  function showCartModal() {
    var cartItemsHtml = '';
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      cartItemsHtml += '<div class="cart-item">';
      cartItemsHtml += '<img src="' + item.image + '" alt="Product Image">';
      cartItemsHtml += '<div>';
      cartItemsHtml += '<h5>' + item.title + '</h5>';
      cartItemsHtml += '<input type="number" class="edit-quantity" min="1" value="' + item.quantity + '">';
      cartItemsHtml += '<p>' + (item.price * item.quantity).toFixed(2) + '</p>';
      cartItemsHtml += '</div>';
      cartItemsHtml += '<i class="uil uil-trash-alt remove-item" data-index="' + i + '"></i>';
      cartItemsHtml += '</div>';
    }
    $('#cart-items').html(cartItemsHtml);
    $('#cart-modal').show();
    updateTotal();
  }

  // Show warning message
  function showWarningMessage(message) {
    $('#warning-message').text(message);
    $('#warning-modal').show();
  }

  // Add product to cart
  $('.add-to-cart').click(function() {
    var product = $(this).closest('.product');
    var title = product.find('.product-title').text();
    var quantity = parseInt(product.find('.quantity-field').val());
    var price = parseFloat(product.find('.product-price').text().substring(1));
    var cartTotalElement = $('#cart-total');

    // Check if the item already exists in the cart
    var itemIndex = -1;
    for (var i = 0; i < cartItems.length; i++) {
      if (cartItems[i].title === title) {
        itemIndex = i;
        break;
      }
    }

    if (itemIndex !== -1) {
      // Item already exists, show warning message
      showWarningMessage('Item is already in the cart.');
    } else {
      // Item doesn't exist, add it to the cart
      var image = product.find('img').attr('src');
      var newItem = {
        image: image,
        title: title,
        quantity: quantity,
        price: price
      };
      cartItems.push(newItem);
      totalCount += quantity;
      updateCartIcon();
    }
  });

  // Show cart modal when cart icon is clicked
  $('#cart-icon').click(function() {
    showCartModal();
  });

  // Close modals when close button is clicked
  $('.close').click(function() {
    $('.modal').hide();
  });

  // Remove item from cart
  $(document).on('click', '.remove-item', function() {
    var itemIndex = $(this).data('index');
    var removedItem = cartItems.splice(itemIndex, 1)[0];
    totalCount -= removedItem.quantity;
    updateCartIcon();
    showCartModal();
  });

  // Update quantity and total on input change
  $(document).on('input', '.edit-quantity', function() {
    var itemIndex = $(this).closest('.cart-item').index();
    var newQuantity = parseInt($(this).val());
    cartItems[itemIndex].quantity = newQuantity;
    showCartModal();
  });

  
// Buy button clicked
$(document).on('click', '#buy-button', function() {
  if (cartItems.length === 0) {
    alert('Your cart is empty. Please add items to your cart.');
  } else {
    // Calculate the total price
    var totalPrice = 0;
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      totalPrice += item.price * item.quantity;
    }

    // Create a URL query string with the item details
    var queryString = 'total=' + totalPrice;
    for (var i = 0; i < cartItems.length; i++) {
      var item = cartItems[i];
      queryString += '&image[]=' + encodeURIComponent(item.image);
      queryString += '&title[]=' + encodeURIComponent(item.title);
      queryString += '&price[]=' + encodeURIComponent(item.price);
      queryString += '&quantity[]=' + encodeURIComponent(item.quantity);
      queryString += '&subtotal[]=' + encodeURIComponent(item.price * item.quantity);
    }
    
    // Redirect to the checkout page with the query string
    window.location.href = 'checkout.html?' + queryString;
  }
});



  // Check if cart is empty on page load and update cart icon
  updateCartIcon();


});
/// Get the search field and search button elements
const searchField = document.getElementById('searchField');
const searchButton = document.getElementById('searchButton');
const errorContainer = document.getElementById('errorContainer');

// Event listener for search button
searchButton.addEventListener('click', () => {
  const searchQuery = searchField.value;
  if (searchQuery) {
    // Scroll to the corresponding section based on search query
    const sectionId = searchQuery.toLowerCase() + '-section';
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Display error message if section not found
      errorContainer.textContent = 'Section not found.';
    }
  } else {
    // Display error message if search query is empty
    errorContainer.textContent = 'Please enter a search query.';
  }
});


