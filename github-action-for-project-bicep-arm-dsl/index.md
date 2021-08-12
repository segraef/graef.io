# Github Action for Project Bicep Arm Dsl


All ARM enthusiasts among us will now probably cry out and be happy. Microsoft announced a new ARM DSL, called Bicep. I won’t go into too much detail here, as I’m more into how to use a GitHub Action to use Bicep to generate an ARM template out of a .bice file. But let me give you some context to [Bicep](https://github.com/Azure/bicep).

<!--more-->

## Wait what?

[Bicep](https://github.com/Azure/bicep) is a domain-specific language (DSL) for the declarative use of Azure resources. It simplifies the authoring experience with cleaner syntax and better support for modularity and code reuse. Bicep is a transparent abstraction over ARM and ARM templates, which means that everything that can be done in an ARM template can also be done in Bicep (outside the temporarily known limitations). All resource types, apiVersions and properties that are valid in an ARM template are equally valid on the first day in Bicep.

Bicep compiles down to standard ARM template JSON files, which means that the ARM JSON is effectively treated as an intermediate language (IL).

Source: [Azure/bicep](https://github.com/Azure/bicep#what-is-bicep)

## Where do I get started?

## GitHub Action Bicep

### Procedure

A bicep file looks like the following:

{{< gist segraef d5a84dabdecded5a98d6e0422bb04a8b main.bicep >}}

With the help of the Bicep CLI you can compile a bice file into an ARM template:

bicep build ./main.bicep
main.json

The GitHub Workflow looks like the following:

{{< gist segraef 84d60537e65ef3cb2e460b2882c985eb workflow.yml >}}

Once your workflow and main.bicep is pushed/commited to your repository the workflow gets executed. After that, the GitHub Action segraef/bicep compiles your main.bicep into the ARM template and is being deployed into Azure using New-AzResourceGroupDeployment.

{{< image src="2021-08-12-17-57-06.png" caption="GitHub Workflow execution." >}}

{{< image src="2021-08-12-17-57-22.png" caption="Finished example deployment of a storage account in Azure defined in main.bicep." >}}

## Yeah wow great and now?

{{< admonition info References >}}
- [Azure GitHub Actions and Wokflows ](/azure-github-actions-and-workflows/)
{{< /admonition >}}

