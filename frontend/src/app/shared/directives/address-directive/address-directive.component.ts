import {Component, Input} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-address-directive',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './address-directive.component.html',
  styleUrl: './address-directive.component.scss'
})
export class AddressDirectiveComponent {
  @Input() email: string | undefined;
  @Input() address: string | undefined;
  @Input() subpath: string | undefined;

  protected readonly environment = environment;

  public getShortenedAddress(): string {
    if (this.address) {
      return this.address.slice(0, 7) + '...' + this.address.slice(-5);
    }
    return '';
  }
}
