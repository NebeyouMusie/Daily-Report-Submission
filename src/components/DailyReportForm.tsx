
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { LoadingSpinner } from './LoadingSpinner';
import { SuccessCard } from './SuccessCard';

const formSchema = z.object({
  date: z.date({
    required_error: "Date is required.",
  }),
  name: z.string().min(1, "Name is required."),
  department: z.string().min(1, "Department is required."),
  report: z.string().min(1, "Report is required."),
});

type FormValues = z.infer<typeof formSchema>;

interface ReportData {
  Date: string;
  Name: string;
  Department: string;
  "What have you done?": string;
  Summary: string;
}

export const DailyReportForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionData, setSubmissionData] = useState<ReportData | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      department: '',
      report: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        date: format(values.date, 'yyyy-MM-dd'),
        name: values.name,
        department: values.department,
        report: values.report,
      };

      console.log('Submitting payload:', payload);

      const response = await fetch('http://localhost:5678/webhook-test/68767294-94a1-4e76-8d1c-dacf8d4b63c4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);

      // Extract the first item from the array response
      const reportData = Array.isArray(responseData) ? responseData[0] : responseData;
      setSubmissionData(reportData);
      
    } catch (error) {
      console.error('Submission error:', error);
      // You could add error handling here with a toast or error state
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewSubmission = () => {
    setSubmissionData(null);
    form.reset();
  };

  if (submissionData) {
    return (
      <div className="space-y-6">
        <SuccessCard data={submissionData} />
        <div className="flex justify-center">
          <Button onClick={handleNewSubmission} variant="outline">
            Submit Another Report
          </Button>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardContent className="p-8">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Daily Report</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your department" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="report"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What have you done today?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your daily activities and accomplishments..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
