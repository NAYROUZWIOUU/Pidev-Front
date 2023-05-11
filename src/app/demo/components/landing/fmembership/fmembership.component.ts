import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Fmembership } from 'src/app/models/fmembership';
import { FmembershipService } from 'src/app/services/Fmembership/fmembership.service';
import { Table } from 'primeng/table';
import { loadStripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-fmembership',
  templateUrl: './fmembership.component.html',
  styleUrls: ['./fmembership.component.css'],
})
export class FmembershipComponent {
  listfoyer!: any;
  fmembership: Fmembership = {};
  submitted: boolean = false;
  capacity: any;
  paymentHandler: any = null;
  foyerid!: number;
  stripe = loadStripe(
    'pk_test_51N6E4VALoxBeJT7rSytmKd13mLcH9mIkdYEvONAMO4aezBqH0YYcEnOzHgfRyBQzY1AC80TlIWiJvNo0YqGuh1Nb003kCF1vqn'
  );

  fmembershipDialog: boolean = false;
  constructor(
    public layoutService: LayoutService,
    public router: Router,
    public fmembershipService: FmembershipService
  ) {}

  ngOnInit(): void {
    this.fmembershipService.getfoyers().subscribe(
      (data) => {
        this.listfoyer = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.invokeStripe();
  }
  makePayment(amount: any) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51N6E4VALoxBeJT7rSytmKd13mLcH9mIkdYEvONAMO4aezBqH0YYcEnOzHgfRyBQzY1AC80TlIWiJvNo0YqGuh1Nb003kCF1vqn',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        alert('Stripe token generated!');
      },
    });
    paymentHandler.open({
      name: 'Payment',
      description: 'Stripe',
      amount: amount * 100,
      currency: 'tnd',
    });
    this.fmembershipService
      .addFMembership(this.fmembership, 3, this.foyerid)
      .subscribe((res) => {
        console.log(res);
      });
    window.location.reload();
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51N6E4VALoxBeJT7rSytmKd13mLcH9mIkdYEvONAMO4aezBqH0YYcEnOzHgfRyBQzY1AC80TlIWiJvNo0YqGuh1Nb003kCF1vqn',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }

  savefmembership() {
    switch (this.fmembership.duration) {
      case 'DAY':
        this.fmembership.price = 20;
        break;
      case 'MONTH':
        this.fmembership.price = 200;
        break;
      case 'SEMESTER':
        this.fmembership.price = 700;
        break;
      case 'YEAR':
        this.fmembership.price = 1300;
        break;
      default:
        // handle invalid input
        break;
    }

    this.makePayment(this.fmembership.price);
    //
  }
  openNew(p: any) {
    this.foyerid = p;
    this.fmembership = {};
    this.submitted = false;
    this.fmembershipDialog = true;
    this.fmembershipService.getcapacity(p).subscribe((res) => {
      console.log(res);
      this.capacity = res;
    });
  }

  hideDialog() {
    this.fmembershipDialog = false;
    this.submitted = false;
  }

  createId(): number {
    const min = 0;
    const max = 100;
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    return randomNumber;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
