$files = Get-ChildItem -Path "src\app\locations" -Filter "page.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match 'onClick') {
        $newContent = $content -replace ' onClick=\{[^\}]+\}', ''
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
        Write-Host "Fixed: $($file.FullName)"
    }
}

Write-Host "Done! Fixed all location pages."
