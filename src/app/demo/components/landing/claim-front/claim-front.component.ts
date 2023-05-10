import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Claim} from "../../../../models/Claim";
import {AboutClaim} from "../../../../models/AboutClaim";
import {ClaimService} from "../../../../services/Claim/claim.service";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-claim-front',
  templateUrl: './claim-front.component.html',
  styleUrls: ['./claim-front.component.css']
})
export class ClaimFrontComponent implements OnInit {
  claims: Claim[];
  claimForm: FormGroup;
  selectedClaim: Claim = new Claim();
  aboutClaimOptions = Object.values(AboutClaim);

  constructor(private claimService: ClaimService, private fb: FormBuilder,public layoutService: LayoutService, public router: Router) {
    this.claimForm = this.fb.group({
      aboutClaim: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.claims = [];
    this.selectedClaim = new Claim();
  }

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims(): void {
    this.claimService.getAllClaims().subscribe(claims => {
      this.claims = claims;
    });
  }

  onAddClaim(): void {
    const claim = this.claimForm.value as Claim;
    claim.dateClaim = new Date();
    this.claimService.addClaim(claim).subscribe(newClaim => {
      this.claims.push(newClaim);
      this.claimForm.reset();
    });
  }

  onSelectClaim(claim: Claim): void {
    this.selectedClaim = claim;
  }

  onUpdateClaim(): void {
    const claim = this.selectedClaim;
    const aboutClaimControl = this.claimForm.get('aboutClaim');
    claim.aboutClaim = aboutClaimControl ? aboutClaimControl.value : '';
    const titleControl = this.claimForm.get('title');
    claim.title = titleControl ? titleControl.value : '';
    const descriptionControl = this.claimForm.get('description');
    claim.description = descriptionControl ? descriptionControl.value : '';
    this.claimService.updateClaim(claim).subscribe(updatedClaim => {
      const index = this.claims.findIndex(c => c.idClaim === updatedClaim.idClaim);
      this.claims[index] = updatedClaim;
      this.claimForm.reset();
      this.selectedClaim = new Claim();
    });
  }

  onDeleteClaim(claim: Claim): void {
    if (claim.idClaim) {
      this.claimService.deleteClaim(claim.idClaim).subscribe(() => {
        const index = this.claims.findIndex(c => c.idClaim === claim.idClaim);
        this.claims.splice(index, 1);
        this.selectedClaim = new Claim();
      });
    }
  }
}
