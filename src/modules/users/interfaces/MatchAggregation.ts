interface MatchAggregationUser {
    $or?: { [key: string]: { $in: RegExp[] } }[];

    username?: { $in: RegExp[] };
    email?: { $in: RegExp[] };
    firstname?: { $in: RegExp[] };
    lastname?: { $in: RegExp[] };
    role?: { $in: string[] };
}
export default MatchAggregationUser;
