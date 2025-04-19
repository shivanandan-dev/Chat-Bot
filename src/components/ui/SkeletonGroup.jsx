import { Skeleton } from '@mui/material';
import React from 'react';

const SkeletonGroup = ({ groupCounts = [5] }) => {
    return (
        <div className="mt-10">
            {groupCounts.map((count, groupIndex) => (
                <div key={groupIndex} className="mb-10">
                    {Array.from({ length: count }).map((_, index) => (
                        <Skeleton
                            key={index}
                            sx={{ bgcolor: 'grey.900' }}
                            variant="text"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SkeletonGroup;
