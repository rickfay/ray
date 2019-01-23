/**
 * Cog Table Class Definition
 */
cog.Prototype.define("Table", cog.Element, {

    /**
     * Build the DOM
     */
    buildDom: function buildDom() {
        this.dom = document.createElement("table");
        this.dom.id = this.id;
        this.obj.resetCss();
    },

    buildChildren: function buildChildren() {

        let data = this.obj.getMetadata().Data;

        if (!(data instanceof Array)) {
            console.warn(`Malformed Data in table: ${this.obj.id}`);
            return;
        }

        for (let row of data) {
            let rowDom = document.createElement("tr");

            for (let cell of row) {
                let cellDom = document.createElement("td");

                for (let element of Object.keys(cell)) {
                    cellDom.appendChild(cog.Class.new(cell[element], element, this.obj.getNamespace()).getDom());
                }

                rowDom.appendChild(cellDom);
            }

            this.dom.appendChild(rowDom);
        }
    }
});