import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function TestComponent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Test Component</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <Label>Test Input</Label>
                        <Input placeholder="Type something..." />
                    </div>
                    <Button>Click me</Button>
                </div>
            </CardContent>
        </Card>
    )
}