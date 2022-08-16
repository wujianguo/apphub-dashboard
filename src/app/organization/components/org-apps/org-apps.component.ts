import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-org-apps',
  templateUrl: './org-apps.component.html',
  styleUrls: ['./org-apps.component.scss']
})
export class OrgAppsComponent implements OnInit {

  namespace = '';

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.namespace = `orgs/${this.route.parent?.snapshot.paramMap.get('org') ?? ''}`;
  }

}
