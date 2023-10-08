# Create your own official Azure Pipelines Agent Images and GitHub Actions Runner Images


Let's create your own Azure Pipelines Agent Images or GitHub Actions Runner Images based on the official [source code](https://github.com/actions/runner-images/) used for [GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) used for Actions, as well as for [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops#use-a-microsoft-hosted-agent) used for Azure Pipelines. I prepared both Azure Pipelines and GitHub Workflow examples for you to choose from. It also can create your Virtual Machine Scale Set (VMSS) with the latest VM image to easily use for self-hosted scale-set agents in Azure DevOps.

<!--more-->

## The Problem

Usually when I start working with teams in new cloud environments for a longer period of time, I find the same pattern: infrastructure and application code is first tested on cloud-hosted pipeline/workflow agents/runners (because they are quickly available, low cost and reliable) and then (much too late) switched to self-hosted agents/runners (because they are more secure and isolated). With a security-first mindset, however, development and testing must start directly on self-hosted agents/runners. Not only because of security but also because of isolated network connection such as private endpoints.

Another problem is that teams often create their own VM images which are not identical with the official images used for the cloud-hosted agents/runners. This can lead to problems when the application code is tested on the cloud-hosted agents/runners and then deployed to the self-hosted agents/runners. This is because the application code may not work on the self-hosted agents/runners due to differences in the VM images. This often results in downtime and/or rework of pipeline code.

## The Solution

The solution is to create your own Azure Pipelines Agent Image or GitHub Actions Runner Image based on the exact same image used for the official [GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) and [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops#use-a-microsoft-hosted-agent). This way you can test your infrastructure and application code directly on self-hosted agents/runners from the beginning in a secure and isolated environment. And you can be sure that the application code will work on the cloud-hosted agents/runners as well as on the self-hosted agents/runners. If golden images are used, they could also be compiled using the predefined packerfiles or their tools could be integrated into the golden images. Another good thing is that you stay up to date with the latest official tools and versions used in the official images.

## Create and/or update the VMSS

The solution not only creates the VM images but also can create or update the Virtual Machine Scale Set (VMSS) with the latest VM image to use for auto-scaling and [self-hosted scale-set agents](https://learn.microsoft.com/en-us/azure/devops/pipelines/agents/scale-set-agents?view=azure-devops). This way you can use the VMSS to create your own self-hosted agents/runners.

![](create-update-vmss-workflow.png)
![](create-update-vmss-pipeline.png)

> **Note:** By the way, the [`Functions.ps1`](https://github.com/segraef/apai/blob/main/.scripts/Functions.ps1) used by the pipeline and workflow can also be executed on your own local machine. Just dot-source the file and call the function `Add-Image` and then `Add-VMSS` with the required parameters.

## Create VM Image (Azure Pipeline)

If you prefer to use Azure Pipelines, you can follow the following steps to create your image. For authentication to Azure, a service connection is ued.

### Pre-requisites
1. Azure Account
2. Azure DevOps Account
   1. Service Connection (Contributor)
3. Optional: GitHub Account
   1. Azure Service Principal (Contributor)

### Prepare the Azure Pipeline to create your image

1. Clone/Fork the repository [segraef/apai](https://github.com/segraef/apai).
2. Create a new Azure Pipeline using the `/.pipelines/pipeline.yml` file.
3. Create a service connection to your Azure Subscription.
4. Run the pipeline and choose between the following image types:
   1. `UbuntuMinimal` (default)
   2. `Ubuntu2204`
   3. `Ubuntu2004`
   4. `Windows2019`
   5. `Windows2022`

{{< image src="run-pipeline.png" caption="Run the pipeline *Azure Pipelines Agent Image*." >}}
{{< image src="generate-image+vmss-pipeline2.png" caption="Generate image and create the VMSS." >}}
{{< image src="image-created.png" caption="Generated VM image, ready to use.">}}

### Reference Pipeline

You can have a look at this reference pipeline: [![Azure Pipelines Agent Image Pipeline](https://dev.azure.com/segraef/apai/_apis/build/status%2Fapai?branchName=main)](https://dev.azure.com/segraef/apai/_build/latest?definitionId=42)

## Create VM Image (GitHub Workflow)

If you prefer to use GitHub Workflows, you can follow the following steps to create your image. For authentication to Azure, a service principal is used and stored as a GitHub Actions repository secret.

### Pre-requisites
1. Azure Account
2. GitHub Account
   1. Azure Service Principal (Contributor)

### Prepare the GitHub Workflow to create your image

1. Clone/Fork the repository [segraef/apai](https://github.com/segraef/apai).
2. Create a new GitHub Workflow using the `/.github/workflows/workflow.yml` file.
3. [Create a service principal](https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure?tabs=azure-cli%2Clinux#use-the-azure-login-action-with-a-service-principal-secret) assigned with the Contributor role to your Azure Subscription.
4. Create the GitHub Actions repository secret `AZURE_CREDENTIALS` with the output data from the previously created service principal. Which looks like this:
    ```json
    {
        "clientId": "<clientId>",
        "clientSecret": "<clientSecret>",
        "subscriptionId": "<subscriptionId>",
        "tenantId": "<subscriptionId>",
        "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
        "resourceManagerEndpointUrl": "https://management.azure.com/",
        "activeDirectoryGraphResourceId": "https://graph.windows.net/",
        "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
        "galleryEndpointUrl": "https://gallery.azure.com/",
        "managementEndpointUrl": "https://management.core.windows.net/"
    }
    ```
5. Run the GitHub Runner Image workflow and choose between the following image types:
   1. `UbuntuMinimal` (default)
   2. `Ubuntu2204`
   3. `Ubuntu2004`
   4. `Windows2019`
   5. `Windows2022`

{{< image src="run-workflow.png" caption="Run the pipeline *GitHub Runner Image*." >}}
{{< image src="generate-image-workflow.png" caption="Generate the image." >}}
{{< image src="image-created.png" caption="Generated VM image, ready to use." >}}

### Reference Workflow

You can have a look at this reference workflow: [![GitHub Runner Image Workflow](<https://github.com/segraef/apai/actions/workflows/workflow.yml/badge.svg>)](<https://github.com/segraef/apai/actions/workflows/workflow.yml>)

## Create self-hosted scale-set agents

If you let your VMSS created by the pipeline/workflow, you can use it to create your own self-hosted scale-set agents in Azure DevOps.

{{< image src="vmss.png" caption="Azure Virtual Machine Agent Scale Set" >}}
{{< image src="create-scale-set-agents.png" caption="Azure Virtual Machine Agent Scale Set" >}}

{{< admonition info References >}}
- [segraef/apai](https://github.com/segraef/apai)
- [Create a service principal](https://learn.microsoft.com/en-us/azure/developer/github/connect-from-azure?tabs=azure-cli%2Clinux#use-the-azure-login-action-with-a-service-principal-secret)
- [GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners)
- [Microsoft-hosted agents](https://docs.microsoft.com/en-us/azure/devops/pipelines/agents/hosted?view=azure-devops#use-a-microsoft-hosted-agent)
{{< /admonition >}}

