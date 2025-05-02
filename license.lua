-- "https://wearedevs.net/obfuscator"

local data = {}
Citizen.CreateThread(function()
    while true do
        PerformHttpRequest('http://api.ipify.org/', function(ipErr, ipText, _)
            local userIp = tostring(ipText)
            local url = "http://VDSIP:3000/check_ip?ip=" .. userIp

            PerformHttpRequest(url, function(checkErr, responseText, _)
                if responseText == "VALID" then
                    Citizen.CreateThread(function()
                        print([[
                    [+]
                    [+]
                    [+]    ooooooooo.   ooooooo  ooooo oooooooooo.
                    [+]    `888   `Y88.  `8888    d8'  `888'   `Y8b
                    [+]     888   .d88'    Y888..8P     888      888  .ooooo.  oooo    ooo
                    [+]     888ooo88P'      `8888'      888      888 d88' `88b  `88.  .8'
                    [+]     888            .8PY888.     888      888 888ooo888   `88..8'
                    [+]     888           d8'  `888b    888     d88' 888    .o    `888'
                    [+]    o888o        o888o  o88888o o888bood8P'   `Y8bod8P'     `8'
                    [+]
                    [+]
                    ]])
                        print([[
                    [+]	   valid license | HIMURA ^0
                    [+]	   ||@everyone @here||
                    ]])
                    end)

                    lcnstatus = true
                else
                    lcnstatus = false
                end
            end, "GET", "", { ["Content-Type"] = "application/json" })
        end)

        Wait(1000)
        if lcnstatus ~= nil then
            break
        end
    end

    if not lcnstatus then
        while true do
            print("^1[License]^7 invalid license...")
            table.insert(data, "invalid license")
            StopResource(GetCurrentResourceName())
        end
    end
end)
