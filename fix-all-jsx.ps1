$files = Get-ChildItem -Path "src\app\locations" -Filter "page.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Fix pattern 1: className="...")}>
    $content = $content -replace 'className="([^"]+)"\)\}>', 'className="$1">'
    
    # Fix pattern 2: className="..." followed by newline and )}
    $content = $content -replace 'className="([^"]+)"\s+\)\}', 'className="$1"'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed: $($file.Name)"
}

Write-Host "`nDone! Fixed all location pages."
