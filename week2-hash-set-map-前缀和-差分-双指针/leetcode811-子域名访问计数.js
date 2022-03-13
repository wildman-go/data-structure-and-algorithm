/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
  let count, domain;
  let countDoaminMap = new Map();
  let ans = [];
  // 1. 遍历计数配对域名，相同域名的在map累加次数
  for (let cpdomain of cpdomains) {
    let splited = cpdomain.split(" ")
    count = parseInt(splited[0]);
    domain = splited[1]

    splitedDomains = splitDomain(domain);
    for (let splitedDomain of splitedDomains) {
      if (!countDoaminMap[splitedDomain]) countDoaminMap[splitedDomain] = 0;
      countDoaminMap[splitedDomain] += count;
    }
  }
  // 2. 将map(key为domain，value为count)以“901 mail.com”的形式存进结果数组，并返回
  for (let domain in countDoaminMap) {
    ans.push(`${countDoaminMap[domain]} ${domain}`);
  }
  return ans;

};

// 将域名分割成多个子域名
function splitDomain (domain) {
  let ans = [];
  ans.push(domain);
  dotIndex = domain.indexOf(".")
  while (dotIndex !== -1) {
    ans.push(domain.substr(dotIndex + 1));
    dotIndex = domain.indexOf(".", dotIndex + 1);
  }
  return ans;
}