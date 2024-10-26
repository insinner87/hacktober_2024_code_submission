function searchFunction() {
    var input, filter, container, tiles, h2, i;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    container = document.getElementsByClassName("container")[0];
    tiles = container.getElementsByClassName("tile");

    for (i = 0; i < tiles.length; i++) {
        h2 = tiles[i].getElementsByTagName("h2")[0];
        if (h2.innerHTML.toUpperCase().indexOf(filter) > -1) {
            tiles[i].style.display = "";
        } else {
            tiles[i].style.display = "none";
        }
    }
}
