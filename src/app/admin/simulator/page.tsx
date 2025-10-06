
'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FlaskConical, PlayCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Progress } from '@/components/ui/progress';

const initialPlacementData = [
    { name: 'Aspirational', "Current": 85, group: 'district', baseScore: 82 },
    { name: 'Rural', "Current": 86, group: 'district', baseScore: 86 },
    { name: 'Urban', "Current": 84, group: 'district', baseScore: 88 },
    { name: 'Female', "Current": 85, group: 'gender', baseScore: 85 },
    { name: 'Male', "Current": 85, group: 'gender', baseScore: 85 },
];

export default function SimulatorPage() {
    const [weights, setWeights] = useState({
        skillMatch: 60,
        preference: 25,
        fairness: 15,
    });
    const [simulatedData, setSimulatedData] = useState(initialPlacementData);
    const [isSimulating, setIsSimulating] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleRunSimulation = () => {
        setIsSimulating(true);
        setProgress(0);

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setIsSimulating(false);
                     // Create new simulated data based on weights
                     setSimulatedData(initialPlacementData.map(item => {
                        // Normalize weights so they sum to 1
                        const totalWeight = weights.skillMatch + weights.preference + weights.fairness;
                        if (totalWeight === 0) { // Avoid division by zero
                            return { ...item, "Simulated": item.baseScore };
                        }
                        const normSkill = weights.skillMatch / totalWeight;
                        const normPref = weights.preference / totalWeight;
                        const normFair = weights.fairness / totalWeight;

                        // Base score represents the group's performance without policy adjustments
                        let policyScore = item.baseScore;

                        // Apply fairness boost/penalty
                        // Aspirational districts get a significant boost from the fairness weight.
                        if (item.name === 'Aspirational') {
                            policyScore += normFair * 15; // Strong boost
                        } else if (item.name === 'Urban') {
                            // Urban districts might have a slight disadvantage if fairness is maxed out
                            policyScore -= normFair * 5;
                        }

                        // Apply skill match effect (e.g., assume Urban has slightly higher skill match)
                        if (item.name === 'Urban') {
                             policyScore += normSkill * 5;
                        } else if (item.name === 'Aspirational' || item.name === 'Rural') {
                             policyScore -= normSkill * 2;
                        }
                        
                        // Apply preference effect (e.g., assume preference fulfillment is relatively neutral)
                        policyScore += normPref * 2;


                        // Add a small random factor for realism
                        const randomFactor = (Math.random() - 0.5) * 2;
                        
                        const simulatedRate = policyScore + randomFactor;

                        return {
                            ...item,
                            "Simulated": Math.min(98, Math.max(50, Math.round(simulatedRate))), // Clamp between 50 and 98 for realism
                        };
                    }));
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    }
    
    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">What-If Simulator</h1>
                <p className="text-muted-foreground">
                Adjust allocation parameters to see their potential impact on fairness and outcomes.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><FlaskConical/> Policy Levers</CardTitle>
                            <CardDescription>Adjust the weights for different factors in the allocation algorithm.</CardDescription>
                        </CardHeader>
                         <CardContent className="space-y-8">
                            <div className="space-y-3">
                                <Label htmlFor="skill-weight">Skill Match Weight ({weights.skillMatch}%)</Label>
                                <Slider id="skill-weight" value={[weights.skillMatch]} onValueChange={(val) => setWeights(w => ({...w, skillMatch: val[0]}))} max={100} step={5} />
                                <p className="text-xs text-muted-foreground">How much to prioritize matching student skills to internship requirements.</p>
                            </div>
                             <div className="space-y-3">
                                <Label htmlFor="pref-weight">Student Preference Weight ({weights.preference}%)</Label>
                                <Slider id="pref-weight" value={[weights.preference]} onValueChange={(val) => setWeights(w => ({...w, preference: val[0]}))} max={100} step={5} />
                                 <p className="text-xs text-muted-foreground">How much to prioritize students' ranked internship preferences.</p>
                            </div>
                             <div className="space-y-3">
                                <Label htmlFor="fair-weight">Fairness Boost ({weights.fairness}%)</Label>
                                <Slider id="fair-weight" value={[weights.fairness]} onValueChange={(val) => setWeights(w => ({...w, fairness: val[0]}))} max={100} step={5} />
                                 <p className="text-xs text-muted-foreground">How much to boost candidates from underrepresented groups (e.g., Aspirational Districts).</p>
                            </div>
                        </CardContent>
                        <CardFooter>
                           <Button className="w-full" size="lg" onClick={handleRunSimulation} disabled={isSimulating}>
                               {isSimulating ? <><Loader2 className="mr-2 animate-spin"/> Simulating...</> : <><PlayCircle className="mr-2"/> Run Simulation</>}
                           </Button>
                        </CardFooter>
                    </Card>
                </div>
                 <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Simulated Outcomes</CardTitle>
                            <CardDescription>Comparison of current allocation vs. simulated allocation based on your new weights.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {isSimulating && (
                                <div className="space-y-2">
                                    <Progress value={progress} />
                                    <p className="text-sm text-center text-muted-foreground">Calculating new potential outcomes...</p>
                                </div>
                            )}
                            <ResponsiveContainer width="100%" height={400}>
                               <BarChart data={simulatedData}>
                                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`}/>
                                    <Tooltip
                                        formatter={(value) => `${value}%`}
                                        cursor={{ fill: 'hsl(var(--secondary))' }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="Current" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Simulated" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
