export type ElasticType<T> = {
    took: number;
    timed_out: false;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: number;
        hits: {
            _index: string;
            _type: string;
            _id: string;
            _score: number;
            _source: T;
        }[];
    };
    status: number;
};

export type AggregatedType<T> = {
    took: number;
    timed_out: false;
    _shards: {
        total: number;
        successful: number;
        skipped: number;
        failed: number;
    };
    hits: {
        total: {
            value: number;
            relation: string;
        };
        max_score: null;
        hits: [];
    };
    aggregations: {
        [T: string]: {
            doc_count_error_upper_bound: number;
            sum_other_doc_count: number;
            buckets: {
                key: string;
                doc_count: number;
                key_as_string?: string;
            }[];
        };
    };
    status: 200;
};
