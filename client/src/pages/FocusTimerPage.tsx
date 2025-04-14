import { useEffect, useState, useRef } from 'react';
import { Button, Card, Typography, Box, CircularProgress } from '@mui/material';
import { Play, Pause, RotateCcw, Trophy } from 'lucide-react';
import { fetchAddNewRecord, fetchRecord, formatTime, isoDurationToMs, msToISODuration } from '../services/focusTimerService';
import { useAuth } from '../providers/AuthProvider';
import "../components/FocusTimer/focustimer.css";
import { FuturisticTechHeading } from '../components/Headings/Headings';

export interface FocusTimerRecord {
  id?: number; 
  user?: number;
  duration: string;
}


export default function FocusTimerPage() {
  const [timer, setTimer] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [record, setRecord] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  const authContext = useAuth() ?? { csrf: null, isAuthenticated: false, setIsAuthenticated: () => {} };
  const { csrf } = authContext;

  useEffect(() => {
    getRecord();
  }, []);
  
  const getRecord = async () => {
    try {
      const res = await fetchRecord();
      if (res?.record?.duration) {
        const durationMs = isoDurationToMs(res.record.duration);
        console.log(durationMs)
        setRecord(durationMs);
      }
    } catch (err) {
      console.error("Failed to load record:", err);
    }
  }


  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = window.setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1000);
      }, 1000);
    }
  };

  const stopTimer = async () => {
    if (isActive) {
      setIsActive(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      if (timer > record) {    
        try {
          const newRecord = {
            duration: msToISODuration(timer)
          };
          await fetchAddNewRecord(newRecord, csrf);
          
          setRecord(timer);
          getRecord();
        } catch (err) {
          console.error("Save error:", err);
        }
      }
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimer(0);
  };

  const progress = ((timer % 1500000) / 1500000) * 100; // 25 minutes = 1500000ms

  return (
    <div className='focustimer-page-wrapper'>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      p={3}
    >

      <FuturisticTechHeading>
        FOCUS TIMER
      </FuturisticTechHeading>
      
      <Card sx={{ p: 4, borderRadius: 4, textAlign: 'center', width: '100%', maxWidth: 400, boxShadow: 6 }}>
        <Box position="relative" display="inline-flex" mb={3}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={240}
            thickness={4}
            sx={{ color: 'grey.200' }}
          />
          <CircularProgress
            variant="determinate"
            value={progress}
            size={240}
            thickness={4}
            sx={{
              position: 'absolute',
              left: 0,
              color: 'primary.main',
            }}
          />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography variant="h3" component="div">
              {formatTime(timer)}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {timer < 1500000 ? 'Focus Time' : 'Take a Break!'}
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" justifyContent="center" gap={2} mb={4}>
          {!isActive ? (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Play size={20} />}
              onClick={startTimer}
              size="large"
            >
              Start
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Pause size={20} />}
              onClick={stopTimer}
              size="large"
            >
              Pause
            </Button>
          )}
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<RotateCcw size={20} />}
            onClick={resetTimer}
            size="large"
          >
            Reset
          </Button>
        </Box>
        
        <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
            <Trophy color="#FFD700" size={24} />
            <Typography variant="h6" component="div">
              Your Record
            </Typography>
          </Box>
          <Typography variant="h5" color="primary" mt={1}>
            {formatTime(record)}
          </Typography>
        </Card>
      </Card>
    </Box>
    </div>
  );
}