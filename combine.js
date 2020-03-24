const fs = require('fs');

const hindi_words = 'aand,aandu,balatkar,balatkari,behen chod,beti chod,bhadva,bhadve,bhandve,bhangi,bhootni ke,bhosad,bhosadi ke,boobe,chakke,chinaal,chinki,chod,chodu,chodu bhagat,chooche,choochi,choope,choot,choot ke baal,chootia,chootiya,chuche,chuchi,chudaap,chudai khanaa,chudam chudai,chude,chut,chut ka chuha,chut ka churan,chut ka mail,chut ke baal,chut ke dhakkan,chut maarli,chutad,chutadd,chutan,chutia,chutiya,gaand,gaandfat,gaandmasti,gaandufad,gandfattu,gandu,gashti,gasti,ghassa,ghasti,gucchi,gucchu,harami,haramzade,hawas,hawas ke pujari,hijda,hijra,jhant,jhant chaatu,jhant ka keeda,jhant ke baal,jhant ke pissu,jhantu,kamine,kaminey,kanjar,kutta,kutta kamina,kutte ki aulad,kutte ki jat,kuttiya,loda,lodu,lund,lund choos,lund ka bakkal,lund khajoor,lundtopi,lundure,maa ki chut,maal,madar chod,mooh mein le,mutth,mutthal,najayaz,najayaz aulaad,najayaz paidaish,paki,pataka,patakha,raand,randaap,randi,randi rona,saala,saala kutta,saali kutti,saali randi,suar,suar ke lund,suar ki aulad,tatte,tatti,teri maa ka bhosada,teri maa ka boba chusu,teri maa ki behenchod ,teri maa ki chut,tharak,tharki,tu chuda'.split(',');

const all_participants = require('./participants');
const separator_string = '='.repeat('62');

let logfile = '';

const customlog = (str) => {
    // console.log(str);
    logfile += str + '\n';
};

const get_data = (batch) => {
    const json_files = [];
    let files = fs.readdirSync('./jc-old');
    if (batch) {
        files = files.filter(f => {
            return f.replace('message_', '').startsWith(batch);
        });
    }

    files.forEach(e => {
        const m = require(`./jc-old/${e}`);
        json_files.push(m);

    });
    let all_messages = [];
    json_files.forEach(e => {
        all_messages.push(...e.messages);
    });
    return {
        people: all_participants,
        messages: all_messages,
    };
}

const get_messages_by_user = (user, messages) => {
    let subset = messages.filter(e => e.sender_name == user.name);
    return subset;
}

const get_people_by_message_count = (people, messages) => {
    let p = people.map(a => ({...a}));
    p = p.map(e => {
        const m = get_messages_by_user(e, messages);
        // e.messages = m;
        e.count = m.length;
        return e;
    });
    p = p.sort((a, b) => {
        return b.count - a.count;
    });
    return p;
};

const get_people_by_reaction_count = (people, messages) => {
    let p = people.map(a => ({...a}));
    p = people.map(a => {
        a.count = 0;
        return a;
    });
    messages.forEach(m => {
        if (m.reactions) {
            m.reactions.forEach(r => {
                const foundIndex = people.findIndex(x => x.name == r.actor);
                if (foundIndex !== -1) {
                    people[foundIndex].count++;
                }
            });
        }
    });
    p = p.sort((a, b) => {
        return b.count - a.count;
    });
    return p;
};

const get_people_by_popularity_count = (people, messages) => {
    let p = people.map(a => ({...a}));
    p = people.map(a => {
        a.count = 0;
        return a;
    });
    messages.forEach(m => {
        if (m.reactions) {
            const foundIndex = p.findIndex(x => x.name == m.sender_name);
            if (foundIndex !== -1) {
                p[foundIndex].count+=m.reactions.length;
            }
        }
    });
    p = p.sort((a, b) => {
        return b.count - a.count;
    });
    return p;
};

const print_people_list = (people, limit, other_name="Everyone Else", fixed=false) => {
    let list = people.slice();
    let remaining = [];
    if (limit || limit == 0) {
        remaining = list.slice(limit);
        list = list.slice(0, 1 * limit)
    }
    list.forEach((e, index) => {
        let count = fixed ? e.count.toFixed(5) : e.count;
        let visible_index = index+1;
        if (visible_index < 10) {
            visible_index = ' ' + visible_index;
        }
        count = '' + count;
        count = count.padEnd('7', ' ');
        customlog(`${visible_index}\t${count}\t${e.name}`);
    });
    if (limit !== 0 && !limit) return;
    if (fixed) return;
    let sum = 0;
    remaining.forEach(e => {
        sum += e.count;
    });
    sum = '' + sum;
    sum = sum.padEnd('7', ' ');
    customlog(`${limit + 1}\t${sum}\t${other_name}`);
}

const print_person = (people, name) => {
    p = people.find(e => e.name == name);
    console.log(p);
}

let stats = {};

const print_stat_by_batch = (store, key, stat_name) => {
    let data = store[stat_name];
    customlog(`\n${separator_string}\n${key}    ${stat_name} by batch\n`);
    const batches = [2015, 2016, 2017, 2018];
    batches.forEach(batch => {
        const new_data = data.filter(e => {
            return e.batch == batch;
        });
        print_people_list(new_data, 0, `Batch: ${batch}`);
    });
}

const store_and_print_list = (store, key, stat_name, people, messages, limit=20, other_name='Everyone Else') => {
    let data = get_people_by_message_count(people, messages);
    if (stat_name.indexOf('react') > -1) {
        data = get_people_by_reaction_count(people, messages);
    }
    if (stat_name.indexOf('popular') > -1) {
        data = get_people_by_popularity_count(people, messages);
    }
    store[stat_name] = data;
    customlog(`\n${separator_string}\n${key}    ${stat_name}\n`);
    print_people_list(data, limit, other_name);
};

print_per_message_stats = (store, key, stat_name) => {
    let data = store[stat_name];
    let msgs = store.top_messagers;
    msgs = msgs.slice(0,25);
    data = data.map(a => ({...a}));
    data = data.filter(e => e.batch > 0);
    data = data.map(e => {
        person_msgs = msgs.find(f=> f.name == e.name);
        if (!person_msgs) return;
        msgs_count = person_msgs.count;
        e.count = e.count/msgs_count;
        return e;
    });
    data = data.sort((a, b) => {
        if (a.count == NaN) a.count = 0;
        if (b.count == NaN) b.count = 0;
        return b.count - a.count;
    });
    store[`${stat_name}_per_message`] = data;
    customlog(`\n${separator_string}\n${key}    ${stat_name}_per_message\n`);
    print_people_list(data, 25, "Everone Else", true);
}

const compute = (opts={}) => {
    let {people, messages} = get_data(opts.batch);
    const content_messages = messages.filter(e => {
        const is_nick_message = e.content && e.content.indexOf(' set the nickname for ') !== -1;
        return !is_nick_message;
    });

    const nick_messages = messages.filter(e => {
        const is_nick_message = e.content && e.content.indexOf(' set the nickname for ') !== -1;
        return is_nick_message;
    });    

    const gif_messages = messages.filter(e => {
        const is_gif = e.gifs && e.gifs.length > 0;
        return is_gif;
    });

    const photo_messages = messages.filter(e => {
        const is_photo = e.photos && e.photos.length > 0;
        return is_photo;
    });

    const swear_messages = messages.filter(e => {
        // Use wordlist from https://github.com/MauriceButler/badwords
        const badwords = require('badwords/regexp');
        const hindiregex = new RegExp('\b' + hindi_words.join("|") + '\b', 'gi');
        const is_bad = e.content && (badwords.test(e.content) || hindiregex.test(e.content));
        return is_bad;
    });

    const no_u_messages = messages.filter(e => {
        const valid = e.content && e.content.toLowerCase().indexOf('no u') > -1;
        return valid;
    });

    const left_messages = messages.filter(e => {
        const valid = e.type === 'Unsubscribe';
        return valid;
    });

    if (opts.title) {
        customlog(`${separator_string}\n${opts.title}\n${separator_string}\n`);
    }
    let store = {};
    store_and_print_list(store, opts.key, 'top_messagers', people, content_messages);
    store_and_print_list(store, opts.key, 'gif_offenders', people, gif_messages);
    store_and_print_list(store, opts.key, 'photo_people', people, photo_messages);
    store_and_print_list(store, opts.key, 'top_foul_mouthed', people, swear_messages);
    store_and_print_list(store, opts.key, 'basic_no_u_responders', people, no_u_messages);
    store_and_print_list(store, opts.key, 'nick_changers', people, nick_messages);
    store_and_print_list(store, opts.key, 'highly_reactive', people, content_messages);
    store_and_print_list(store, opts.key, 'quiters', people, left_messages);
    store_and_print_list(store, opts.key, 'popular_folks', people, content_messages);
    print_stat_by_batch(store, opts.key, 'top_messagers');
    print_stat_by_batch(store, opts.key, 'gif_offenders');
    print_stat_by_batch(store, opts.key, 'photo_people');
    print_stat_by_batch(store, opts.key, 'top_foul_mouthed');
    print_stat_by_batch(store, opts.key, 'basic_no_u_responders');
    print_stat_by_batch(store, opts.key, 'nick_changers');
    print_stat_by_batch(store, opts.key, 'highly_reactive');
    print_stat_by_batch(store, opts.key, 'quiters');
    print_stat_by_batch(store, opts.key, 'popular_folks');
    print_per_message_stats(store, opts.key, 'photo_people');
    print_per_message_stats(store, opts.key, 'top_foul_mouthed');
    print_per_message_stats(store, opts.key, 'popular_folks');
    if(opts.key) {
        stats[opts.key] = store;
    }
}

const print_stats = (logs) => {
    logs = logs.map(e => {
        e = e + '\n' + separator_string;
        e = e.split('\n');
        return e;
    });
    const line_limit = logs[0].length;
    let lines = new Array(line_limit).fill(0).map(() => new Array(logs.length).fill(''));
    logs.forEach((log, j) => {
        log.forEach((line, i) => {
            lines[i][j] = line;
        })
    });
    const column_width = separator_string.length;
    lines.forEach(line => {
        line = line.map((segment => {
            segment = segment.replace(/\t/g, '    ');
            if (segment.length < column_width - 4) {
                segment = '    ' + segment;
            }
            return segment.padEnd(column_width, ' ');
        }))
        let to_print = '|'
        line.forEach(segment => {
            to_print += `${segment}|`;
        });
        console.log(to_print);
    });
}

const main = () => {
    const logs = [];
    logfile = '';
    compute({
        batch: 'A',
        title: "Feb 2nd 2017 to Feb 2nd 2020.",
        key: "till-feb-2020",
    });
    logs.push(logfile);
    logfile = '';
    compute({
        batch: 'B',
        title: "Feb 2nd 2020 to Mar 24th 2020.",
        key: 'till-quarantine-day-10',
    });
    logs.push(logfile);
    logfile = '';
    compute({
        title: "All Time",
        key: 'all-time',
    });
    logs.push(logfile);
    print_stats(logs);
    fs.writeFileSync('./stats.json', JSON.stringify(stats, null, 4));
    return stats; // JSON stats. Maybe draw some graphs or paint a rainbow with these.
}

main();
