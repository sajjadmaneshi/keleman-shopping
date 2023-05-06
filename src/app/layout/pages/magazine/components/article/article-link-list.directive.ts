import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'article[articleLink]',
  standalone: true,
})
export class ArticleLinkListDirective implements OnInit {
  headTags: HTMLHeadingElement[] = [];
  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  ngOnInit(): void {
    this.headTags = this._el.nativeElement.querySelectorAll('h2');

    console.log(this.headTags);
    this.makeLinkTags();
  }

  makeLinkTags() {
    let ulNodes: HTMLLIElement[] = [];
    if (this.headTags.length > 0) {
      this.headTags.forEach((hTag, index) => {
        this._renderer.setAttribute(hTag, 'id', `${hTag.innerText}${index}`);
        let li = this._renderer.createElement('li');
        let aTag = this.makeATag(hTag);
        li.prepend(aTag);
        ulNodes.push(li);
      });
      let label = this._renderer.createElement('p');
      label.innerText = 'فهرست مطالب';
      this._renderer.setStyle(label, 'padding', '1rem');
      let linkListContent = this._renderer.createElement('div');
      this._renderer.setAttribute(linkListContent, 'id', 'contentList');
      this._renderer.setStyle(linkListContent, 'background-color', '#f1f1f1');
      this._renderer.setStyle(linkListContent, 'width', 'fit-content');
      this._renderer.setStyle(linkListContent, 'padding', '15px 25px');
      this._renderer.setStyle(linkListContent, 'border-radius', ' 20px');
      let linkList = this._renderer.createElement('ul');
      this._renderer.setAttribute(linkList, 'id', 'ulBulletList');
      linkList.prepend(...ulNodes);
      linkListContent.append(label);
      linkListContent.append(linkList);
      const firstHTag = this.headTags[0];
      if (firstHTag) {
        const firstTagParent = firstHTag.parentNode;
        if (firstTagParent)
          firstTagParent.insertBefore(linkListContent, firstHTag);
      }
    }
  }

  makeATag(hTag: HTMLHeadingElement) {
    let aTag = this._renderer.createElement('a');

    aTag.onclick = () => {
      const el = document.getElementById(hTag.id);
      el?.scrollIntoView({ behavior: 'smooth' });
    };
    this._renderer.setStyle(aTag, 'color', '#0d6efd');
    this._renderer.setStyle(aTag, 'cursor', 'pointer');
    aTag.innerText = hTag.innerText;
    return aTag;
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
