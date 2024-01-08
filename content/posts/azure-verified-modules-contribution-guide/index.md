---
title: "Azure Verified Modules Contribution Guide"
description: ""
date: 2024-01-08T10:23:43+10:00
lastmod: 2024-01-08T10:23:43+10:00
draft: true
resources:
  - name: "featured-image"
    src: "featured-image.jpg"
  - name: "featured-image-preview"
    src: "featured-image-preview.jpg"
tags: ["tag1", "tag2"]
categories: ["Other"]
---

Introduction

<!--more-->

# Process for owner to support module contributors

1. As owner you have to RTFM.
2. See [index csv's](https://github.com/Azure/Azure-Verified-Modules/tree/main/docs/static/module-indexes) for AVM Resource Module Naming.
   1. Example: `terraform-<provider>-avm-res-<rp>-<ARM resource type>`
3. Create GitHub teams:
   1. Terraform
      1. `@Azure/avm-res-<RP>-<modulename>-module-owners-tf`
      2. `@Azure/avm-res-<RP>-<modulename>-module-contributors-tf`
   2. Bicep
      1. `@Azure/avm-res-<RP>-<modulename>-module-owners-bicep` with parent team `@Azure/avm-technical-reviewers-bicep`.
      2. `@Azure/avm-res-<RP>-<modulename>-module-contributors-bicep` and parent team `@Azure/avm-module-contributors-bicep`.
   3.
4. Create module repostory with [terraform-azuremrm-avm-template](https://github.com/Azure/terraform-azurerm-avm-template) in Azure organization with the following [details](https://dev.azure.com/CSUSolEng/Azure%20Verified%20Modules/_wiki/wikis/AVM%20Internal%20Wiki/333/-TF-Create-repository-in-Github-Azure-org-and-conduct-business-review).
5. Add the teams with following permissions to the repo:
   1. Admin: `@Azure/avm-core-team`
   2. Admin: `@Azure/terraform-azure` = Terraform PG
   3. Write: `@Azure/avm-res-<RP>-<modulename>-module-contributors-tf` = AVM Resource Module Contributors
   4. Admin: @Azure/avm-res-<RP>-<modulename>-module-owners-tf = AVM Resource Module Owners
6. Set labels: These `Set-AvmGitHubLabels.ps1` can be downloaded from <a href="/Azure-Verified-Modules/scripts/Set-AvmGitHubLabels.ps1" download>here</a>.

## AVM Module Reviews for Terraform

Please see the modules in the "To do" bucket of the [Module Reviews Tracker](https://tasks.office.com/microsoft.onmicrosoft.com/en-US/Home/Planner/#/plantaskboard?groupId=f07f871f-f252-4b20-b9ef-9a4ecfdc14f1&planId=bG7H9OaVXU6C4SmlpJjtcJUAGC4R) and pick one to review by assigning yourself and moving it to the "In Progress" bucket
Start the review by going through the module proposal on the AVM repo, the module's repo and any PRs and issues in it to get situational awareness and any background/history on the module.
Review the module against the [shared](https://azure.github.io/Azure-Verified-Modules/specs/shared/) and [terraform](https://azure.github.io/Azure-Verified-Modules/specs/terraform/) specifications, 86 specifications in total
Review and confirm that module owner followed the [contribution](https://azure.github.io/Azure-Verified-Modules/contributing/process/) process and terraform contribution guide
Review the changes in the module file by file especially if there's a PR to ensure a complete and thorough review
Provide your feedback either on the PR directly if there is one requesting review from avm-core-team-technical otherwise open an issue on the repo and name it "AVM Module Review" and provided a bulled list of feedback in it
Please let me know so that I my to do a quick check of your review
Once you're review is complete, move the task to the "Done" bucket in the Module Review Tracker
Do not mark the task as complete by clicking the checkmark till the module owner has actioned your feedback if any and published the module into the registry.
Once the module is published, mark the task as complete by clicking the checkmark and let me know to update the module index and the proposal in the the AVM github repo accordingly.

### Terraform Codex parts to consider during review

terraform.lock.hcl shouldn't be in the repo per the .gitignore file.
Update the support.md file.
Consider following specs TFNFR31 for the local.tf file.
Consider updating version to 0.1.0 as the first version that would be published into the terraform registry per spec SNFR17.
Consider updating output to contain Resource Name, ID and Object per specs RMFR7 & TFFR2.
Consider setting prevent_deletion_if_contains_resources to false in provider block in example code per spec TFNFR36.
Consider setting a constraint on maximum major version of Provider per spec TFNFR26.
The Contributor and Owner teams are not added to the repo per spec SNFR20.
Repo needs to be setup in the Azure GitHub Org
\_header.md needs to be updated
readme.md needs to be generated as per spec SNFR15 & TFNFR2
support.md needs to be updated
locals.telemetry.tf needs to be updated
Outputs haven't been defined in output.tf per specs RMFR7 & TFFR2
Consider setting a constraint on maximum major version of Provider per spec TFNFR26 in terraform.tf file.
Exclude terraform.tfvars file from the repo
None of the interfaces have been implemented as per spec RMFR5
Declaration of provider in module should be as per spec TFNFR27 in main.tf
After reviewing the main.tf, see multiple issues there in coding style, would recommend following the VM module here. https://github.com/Azure/terraform-azurerm-avm-res-compute-virtualmachine
Default E2E testing hasn't been done as per spec SNFR2, also consider adding additional examples giving the criticality of this module.
CODEOWNERS file needs to be updated as per spec SNFR9

NOTES

1. Read and adhere to Module specifications.
2. Rather refer to the origin content instead of hardcoding it because things change.

ADDITIONS to Terraform contribution process

1. Make sure module authors/contributors tested their module in their environment before raising a PR. The PR uses e2e checks with 1ES agents in the 1ES subscriptions. At the moment their is no read access to the 1ES susbcription. Also if more than two subscriptions are required for testin, that's currently not supported.

{{< admonition info References >}}

- [Example](https://example.com)
  {{< /admonition >}}
