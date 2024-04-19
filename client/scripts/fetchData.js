function fetchData(activeBtnId) {
  const productsContainer = document.getElementById("products");
  fetch(`http://37.140.197.124:8087/${activeBtnId}`)
    .then((res) => res.json())
    .then((data) => (productsContainer.innerHTML = data))
    .then(() => makeEachProductItemToucheble())
    .then(() => checkActiveItem())
    .catch((error) =>
      console.error("Ошибка при получении данных с сервера:", error)
    );
}
