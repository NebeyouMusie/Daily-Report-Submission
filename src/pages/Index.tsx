
import React from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { DailyReportForm } from '@/components/DailyReportForm';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-colors">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Daily Report Submission</h1>
            <ThemeToggle />
          </div>
          
          <div className="flex justify-center">
            <DailyReportForm />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
