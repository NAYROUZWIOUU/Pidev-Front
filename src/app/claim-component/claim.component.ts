import { Component, OnInit } from '@angular/core';
import {Claim} from "../models/Claim";
import {ClaimService} from "../services/Claim/claim.service";
import {AboutClaim} from "../models/AboutClaim";

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  claims:Claim[]=[];
  selectedClaim: Claim = new Claim();
  errorMessage: string = '';
  newClaim: Claim={
    aboutClaim: undefined,
    title:'',
    description:'',
    dateClaim: new Date('2023-05-02T10:30:00') ,
  };

  constructor(private claimService: ClaimService) { }

  ngOnInit(): void {
    this.getAllClaims();
    this.claimService.getAllClaims().subscribe(claims=>this.claims=claims);
  }

  getAllClaims() {
    this.claimService.getAllClaims()
      .subscribe(
        claims => this.claims = claims,
        error => this.errorMessage = error
      );
  }

  addClaim() {
    this.claimService.addClaim(this.selectedClaim)
      .subscribe(
        claim => {
          this.claims.push(claim);
          this.selectedClaim = new Claim();
          this.newClaim={
            aboutClaim: undefined,
            title:'',
            description:'',
            dateClaim: new Date('2023-05-02T10:30:00')
          }
        },
        error => this.errorMessage = error
      );
  }

  updateClaim() {
    this.claimService.updateClaim(this.selectedClaim)
      .subscribe(
        claim => {
          const index = this.claims.findIndex(c => c.idClaim === claim.idClaim);
          this.claims[index] = claim;
          this.selectedClaim = new Claim();
        },
        error => this.errorMessage = error
      );
  }

  deleteClaim(id: number) {
    this.claimService.deleteClaim(id)
      .subscribe(
        () => {
          const index = this.claims.findIndex(c => c.idClaim === id);
          this.claims.splice(index, 1);
        },
        error => this.errorMessage = error
      );
  }

  selectClaim(claim: Claim) {
    this.selectedClaim = Object.assign({}, claim);
  }

  cancel() {
    this.selectedClaim = new Claim();
  }
}
