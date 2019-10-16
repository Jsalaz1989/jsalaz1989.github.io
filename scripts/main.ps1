# Created profile with new-item -path $profile -itemtype file -force at C:\Users\Jaime\Documents\WindowsPowerShell\Profile.ps1
# Filled it with: Set-Alias -Name n2tClient -Value C:/Users/Jaime/Documents/Nand2Tetris/N2TClient/scripts/main

"n2tc moving to root folder: $PSScriptRoot"
cd $PSScriptRoot

If     ($args[0]    -eq     "run")      { .\/npmRun }
ElseIf ($args[0]    -eq     "build")    { .\/npmBuild }

"n2tc returning to root folder: $PSScriptRoot"
cd $PSScriptRoot