$body = @{
    full_name = "ChatGPT Test"
    phone = "+1 949 555 0000"
    email = "test@example.com"
    loan_amount = 400000
    credit_score_range = "700-719"
    notes = "Test from ChatGPT Action"
    productType = "dscr"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://www.capitalbridgesolutions.com/api/chatgpt/save-lead" -Method POST -Body $body -ContentType "application/json"
    Write-Host "SUCCESS:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "ERROR:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    if ($_.ErrorDetails.Message) {
        Write-Host "Response Body:" -ForegroundColor Yellow
        Write-Host $_.ErrorDetails.Message
    }
}
