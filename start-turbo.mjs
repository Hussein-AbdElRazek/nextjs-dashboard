import { exec } from "child_process";
import open from "open";

const devServer = exec("next dev --turbopack");

devServer.stdout.on("data", (data) =>
{
    const output = data.toString();
    console.log(output);

    // Look for the URL or "Ready"
    const urlMatch = output.match(/http:\/\/localhost:\d+/);
    if (urlMatch)
    {
        open(urlMatch[0]); // Open the exact URL (e.g., http://localhost:3001)
    } else if (output.includes("Ready"))
    {
        open("http://localhost:3000"); // Fallback
    }
});

devServer.stderr.on("data", (data) =>
{
    console.error(data.toString());
});

devServer.on("close", (code) =>
{
    console.log(`Server process exited with code ${code}`);
});