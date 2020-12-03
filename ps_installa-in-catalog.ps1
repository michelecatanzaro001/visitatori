#mcatanzaro@catanza.onmicrosoft.com
m365 spo app add --filePath ./sharepoint/solution/visitor-man.sppkg --overwrite  --appCatalogUrl https://catanza.sharepoint.com/sites/catalogo-dev --verbose
m365 spo app deploy --name visitor-man.sppkg