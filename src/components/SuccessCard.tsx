
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ReportData {
  Date: string;
  Name: string;
  Department: string;
  "What have you done?": string;
  Summary: string;
}

interface SuccessCardProps {
  data: ReportData;
}

export const SuccessCard: React.FC<SuccessCardProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-8">
        <div className="flex flex-col items-center space-y-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-semibold text-center">Successfully Submitted! 🎉</h2>
          
          <div className="w-full space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-medium mb-3 text-center">📋 Report Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">📅 Date:</span>
                  <p className="mt-1 text-muted-foreground">{formatDate(data.Date)}</p>
                </div>
                
                <div>
                  <span className="font-medium">👤 Name:</span>
                  <p className="mt-1 text-muted-foreground">{data.Name}</p>
                </div>
                
                <div>
                  <span className="font-medium">🏢 Department:</span>
                  <p className="mt-1 text-muted-foreground">{data.Department}</p>
                </div>
                
                <div>
                  <span className="font-medium">📝 Report:</span>
                  <p className="mt-1 text-muted-foreground whitespace-pre-wrap">{data["What have you done?"]}</p>
                </div>
                
                <div>
                  <span className="font-medium">📊 Summary:</span>
                  <p className="mt-1 text-muted-foreground">{data.Summary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
