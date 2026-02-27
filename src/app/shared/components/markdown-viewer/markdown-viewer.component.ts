import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({

	selector: 'app-markdown-viewer',
	templateUrl: './markdown-viewer.component.html',
	styleUrls: ['./markdown-viewer.component.scss'],
	encapsulation: ViewEncapsulation.None,
	standalone: false

}) export class MarkdownViewerComponent implements OnInit {

	@Input() public content: string = '';

	public constructor() {}

	public ngOnInit(): void {}

}