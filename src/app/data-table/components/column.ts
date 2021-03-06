import { Directive, Input, ContentChild, OnInit, ContentChildren, QueryList, ViewChildren } from '@angular/core';
import { DataTableRow } from './row';
import { CellCallback } from './types';
import { DataTableColumnChild } from "./column-child";


@Directive({
    selector: 'data-table-column'
})
export class DataTableColumn implements OnInit {

    // init:
    @Input() header: string;
    @Input() sortable = false;
    @Input() resizable = false;
    @Input() property: string;
    @Input() styleClass: string;
    @Input() cellColors: CellCallback;
    @Input() width: number | string;
    @Input() visible = true;

    @Input() headerColSpan = '1';
    @Input() headerRowSpan = '1';

    @ContentChild('dataTableCell') cellTemplate;
    @ContentChild('dataTableHeader') headerTemplate;
    @ContentChildren(DataTableColumnChild) children: QueryList<DataTableColumnChild>;

    private styleClassObject = {}; // for [ngClass]

    ngOnInit() {
        this._initCellClass();
    }

    getCellColor(row: DataTableRow, index: number) {
        if (this.cellColors !== undefined) {
            return (<CellCallback>this.cellColors)(row.item, row, this, index);
        }
    }

    private _initCellClass() {
        if (!this.styleClass && this.property) {
            if (/^[a-zA-Z0-9_]+$/.test(this.property)) {
                this.styleClass = 'column-' + this.property;
            } else {
                this.styleClass = 'column-' + this.property.replace(/[^a-zA-Z0-9_]/g, '');
            }
        }

        if (this.styleClass != null) {
            this.styleClassObject = {
                [this.styleClass]: true
            };
        }
    }
}
