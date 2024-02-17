import { Component, Input, OnInit } from '@angular/core';
import { SnackBarService } from '../../../../../shared/components/snack-bar/snack-bar.service';
import { SsrService } from '../../../../../shared/services/ssr/ssr.service';
import { Location } from '@angular/common';

@Component({
  selector: 'keleman-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss'],
})
export class ShareButtonsComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;
  @Input() include!: string[];
  pageUrl!: string;
  shareUrls!: any[];

  constructor(
    private readonly _snackBar: SnackBarService,
    private readonly _location: Location,
    private readonly _ssrService: SsrService
  ) {
    this.pageUrl = this._location.path();
  }

  determineUrl(include: string) {
    return this.shareUrls.find((x) => x.title === include)?.value;
  }

  copyUrl() {
    const url = this._ssrService.getLocation.href;
    navigator.clipboard.writeText(url).then(
      () => {
        this._snackBar.showSuccessSnackBar('آدرس در کلیپ بورد کپی شد');
      },
      (err) => {
        console.error('Failed to copy URL to clipboard:', err);
      }
    );
  }

  ngOnInit(): void {
    this.shareUrls = [
      {
        title: 'whatsapp',
        value: `whatsapp://send?text=${this._ssrService.getLocation.href} `,
      },
      {
        title: 'telegram',
        value: `https://telegram.me/share/url?url=${this._ssrService.getLocation.href}`,
      },
      {
        title: 'mail',
        value: `mailto:?subject=Example%20Subject&amp;body=Check%20out%20this%20page:%20$www.google.com`,
      },
      {
        title: 'twitter',
        value: `https://twitter.com/intent/tweet?text=${this.title}&amp;url=${this._ssrService.getLocation.href}`,
      },
    ];
  }
}
