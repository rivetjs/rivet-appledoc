var spawn = require('child_process').spawn;

module.exports = function(files, options) {
  options = options || {};
  
  return function appledoc(done) {
    var command = options.command || 'appledoc'
      , args = [];
    if (options.output) { args.push('-o'); args.push(options.output) }                   // -o, --output
    if (options.name) { args.push('-p'); args.push(options.name) }                       // -p, --project-name
    if (options.company) { args.push('-c'); args.push(options.company) }                 // -c, --project-company
    if (options.companyUTI) { args.push('--company-id'); args.push(options.companyUTI) } // --company-id
    if (options.installDocSet === false) { args.push('--no-install-docset') }
    args.push(files);
    
    var proc = spawn(command, args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);

    proc.on('exit', function(code, signal) {
      if (0 !== code) { return done(new Error('-rivet: appledoc: failed with exit code: ' + code)); }
      return done();
    });
  }
}
