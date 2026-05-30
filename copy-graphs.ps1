$src = "c:\Users\ayham\COE-AIS\WeatherData\WEB\graphs"
$dst = "c:\Users\ayham\COE-AIS\WeatherData\WEB\public\graphs"

$mapping = @{
    "temperature" = "مخططات درجات الحرارة"
    "rainfall"    = "مخطط سقوط الامطار"
    "humidity"    = "مخطط الرطوبة النسبية"
    "evaporation" = "مخطط التبخر"
    "wind"        = "مخطط سرعة الرياح"
    "sunshine"    = "مخطط ساعات الشمس"
    "pressure"    = "مخطط الارتفاع عن سطح البحر"
}

foreach ($key in $mapping.Keys) {
    $srcFolder = Join-Path $src $mapping[$key]
    $dstFolder = Join-Path $dst $key
    
    if (-not (Test-Path $dstFolder)) {
        New-Item -ItemType Directory -Path $dstFolder -Force | Out-Null
    }
    
    if (Test-Path $srcFolder) {
        Get-ChildItem -Path $srcFolder -File | ForEach-Object {
            $destFile = Join-Path $dstFolder $_.Name
            Copy-Item -Path $_.FullName -Destination $destFile -Force
            Write-Host "Copied: $key / $($_.Name)"
        }
    } else {
        Write-Host "NOT FOUND: $srcFolder"
    }
}

Write-Host "Done! Counting files:"
Get-ChildItem -Path $dst -Recurse -File | Measure-Object | Select-Object Count
